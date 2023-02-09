import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

export const LiverManager = () => {

    const [benh, setBenh] = useState([])
    const [page, setPage] = useState({
        current: 0,
        start: 0,
        end: 5,
    })

    const deleteBenhGan = (maBenhGan) => {
        axios.delete(`http://127.0.0.1:8000/benhgan/${maBenhGan}/`)
            .then((res) => {
                toast.success('Xoá thành công')
            })
            .catch((res) => {
                toast.error('Xoá thất bại')
            })
    }

    useEffect(() => {
        const getBenhGan = async () => {
            await axios.get('http://127.0.0.1:8000/benhgan/')
                .then((res) => {
                    setBenh(res.data)
                })
        }
        getBenhGan()
    }, [])

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

    return (
        <div>
            <p className="bread">
                <span>Quản lý bệnh gan</span>
            </p>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Tên bệnh</th>
                            <th scope="col">
                                <Link to='/Manager/Liver/Add'>
                                    <button className="btn btn-feature add">
                                        <i class="bi bi-plus-lg"></i>
                                    </button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {benh.length === 0 ?
                            <tr>
                                <td colSpan={3}>Chưa có bệnh gan</td>
                            </tr> :
                            benh.slice(page.start, page.end).map((b, i) => (
                                <tr key={b.maBenh}>
                                    <td scope="row">{b.tenBenh}</td>
                                    <td>
                                        <div style={{ display: 'inline' }}>
                                        </div>
                                        <Link to={`/Manager/Liver/Update/${b.maBenh}`}>
                                            <button className="btn btn-feature edit" >
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteBenhGan(b.maBenh)}
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
                                {page.current + 1} - {Math.ceil(benh.length / 5)}
                                <button className="btn" onClick={() => onChangePage(1)}><i class="bi bi-caret-right"></i></button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

