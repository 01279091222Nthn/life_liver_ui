import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";


const NewsManagement = () => {

    const [tinTuc, setTinTuc] = useState([])

    const deleteTinTuc = (maTinTuc) => {
        axios.delete(`http://127.0.0.1:8000/tintuc/${maTinTuc}/`)
            .then((res) => {
                toast.success('Xoá thành công')
            })
            .catch((res) => {
                toast.error('Xoá thất bại')
            })
    }

    useEffect(() => {
        const getTinTuc = async () => {
            await axios.get('http://127.0.0.1:8000/tintuc/')
                .then((res) => {
                    setTinTuc(res.data)
                })
        }
        getTinTuc()
    }, [])

    const formatDate = (date) => {
        var d = new Date(date);
        var month = "" + (d.getMonth() + 1);
        var day = "" + d.getDate();
        var year = d.getFullYear();
        // var hour = "" + d.getHours();
        // var minutes = "" + d.getMinutes();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        // if (hour.length < 2) hour = "0" + hour;
        // if (minutes.length < 2) minutes = "0" + minutes;

        return [day, month, year].join("/");
    }

    return (
        <>
            <p className="bread">
                <span>Quản lý tin tức</span>
            </p>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Ngày đăng
                                <Link to='/Manager/News/Add'>
                                    <button className="btn btn-feature add">
                                        <i class="bi bi-plus-lg"></i>
                                    </button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tinTuc.length === 0 ?
                            <tr>
                                <td colSpan={3}>Chưa có tin tức</td>
                            </tr> :
                            tinTuc.map((t, i) => (
                                <tr key={t.maTinTuc}>
                                    <td>{i + 1}</td>
                                    <td scope="row">{t.tieuDe}</td>
                                    <td>{formatDate(t.ngayDang)}
                                        <div style={{ display: 'inline' }}>
                                        </div>
                                        <Link to={`/Manager/News/Update/${t.maTinTuc}`}>
                                            <button className="btn btn-feature edit" >
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteTinTuc(t.maTinTuc)}
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

export default NewsManagement;