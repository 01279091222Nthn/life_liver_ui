import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderManagement = () => {

    const [order, setOrder] = useState([])
    const [page, setPage] = useState({
        current: 0,
        start: 0,
        end: 5,
    })

    const onChangePage = (num) => {
        const i = page.current + num
        setPage(
            {
                ...page,
                current: i,
                start: i * 5,
                end: i * 5 + 5,
            })
    }

    const formatDate = (date) => {
        var d = new Date(date);
        var month = "" + (d.getMonth() + 1);
        var day = "" + d.getDate();
        var year = d.getFullYear();
        var hour = "" + d.getHours();
        var minutes = "" + d.getMinutes();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        if (hour.length < 2) hour = "0" + hour;
        if (minutes.length < 2) minutes = "0" + minutes;

        return [hour, minutes].join(":") + " " + [day, month, year].join("/");
    }

    const deleteDonHang = (maDonHang) => {
        axios.delete(`http://127.0.0.1:8000/donhang/`, maDonHang)
            .then((res) => {

            })
    }

    useEffect(() => {
        const getOrder = () => {
            axios.get('http://127.0.0.1:8000/donhang/')
                .then((res) => {
                    setOrder(res.data)
                })
        }
        getOrder()
    }, [])

    return (
        <>
            <p className="bread">
                <span>Quản lý đơn hàng</span>
            </p>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th scope="col">Ngày lập</th>
                            <th scope="col">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.length === 0 ?
                            <tr>
                                <td colSpan={3}>Chưa có tin tức</td>
                            </tr> :
                            order.slice(page.start, page.end).map((o, i) => (
                                <tr key={o.maDonHang}>
                                    <td>{o.maDonHang}</td>
                                    <td scope="row">{formatDate(o.ngayLap)}</td>
                                    <td>{o.trangThai === 0 ? 'Chưa giao' : 'Đã giao'}
                                        <div style={{ display: 'inline' }}>
                                        </div>
                                        <Link to={`/Manager/Order/${o.maDonHang}`}>
                                            <button className="btn btn-feature edit" >
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteDonHang(o.maDonHang)}
                                            className="btn btn-feature delete">
                                            <i class="bi bi-x-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'end' }}>
                                <button className="btn" onClick={() => onChangePage(-1)}><i class="bi bi-caret-left"></i></button>
                                {page.current + 1} - {Math.ceil(order.length / 5)}
                                <button className="btn" onClick={() => onChangePage(1)}><i class="bi bi-caret-right"></i></button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )

}

export default OrderManagement;