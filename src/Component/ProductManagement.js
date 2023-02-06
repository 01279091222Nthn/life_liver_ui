import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductManagement = () => {

    const [la, setLa] = useState([])

    const deletLaThuoc = (maLa) => {
        axios.delete(`http://127.0.0.1:8000/lathuoc/${maLa}/`)
            .then((res) => {
                toast.success('Xoá thành công')
                setLa(la.filter((l)=>l.maLa!==maLa))
            })
            .catch((res) => {
                toast.error('Xoá thất bại')
            })
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/lathuoc/`)
        .then((res)=>setLa(res.data))      
    }, [])

    return (
        <>
            <p className="bread">
                <span>Quản lý sản phẩm</span>
            </p>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th scope="col">Tên lá</th>
                            <th scope="col">Số lượng còn (1 gói - 100 gram)
                                <Link to='/Manager/Product/Add'><button className="btn btn-feature add">
                                    <i class="bi bi-plus-lg"></i>
                                </button></Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {la.length === 0 ?
                            <tr>
                                <td colSpan={3}>Chưa có sản phẩm</td>
                            </tr> :
                            la.map((l, i) => (
                                <tr key={l.maLa}>
                                    <td>{i + 1}</td>
                                    <td scope="row">{l.tenLa}</td>
                                    <td>{l.soLuongCon}
                                        <div style={{ display: 'inline' }}>
                                        </div>
                                        <Link to={`/Manager/Product/Update/${l.maLa}`}>
                                            <button className="btn btn-feature edit" >
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                        </Link>
                                        <button onClick={() => deletLaThuoc(l.maLa)} className="btn btn-feature delete">
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

export default ProductManagement;