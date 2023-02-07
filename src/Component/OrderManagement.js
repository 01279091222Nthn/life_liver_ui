import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderManagement = () => {

    const [order, setOrder] = useState([])

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

    const deleteDonHang = (maDonHang) =>{
        axios.delete(`http://127.0.0.1:8000/donhang/`,maDonHang)
        .then((res)=>{

        })
    }

    useEffect(()=>{
        const getOrder = () =>{
            axios.get('http://127.0.0.1:8000/donhang/')
            .then((res)=>{
                setOrder(res.data)
            })
        }
        getOrder()
    },[])

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
                            order.map((o, i) => (
                                <tr key={o.maDonHang}>
                                    <td>{o.maDonHang}</td>
                                    <td scope="row">{formatDate(o.ngayLap)}</td>
                                    <td>{o.trangThai===0?'Chưa giao':'Đã giao'}
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
                </table>
            </div>
        </>
    )

}

export default OrderManagement;