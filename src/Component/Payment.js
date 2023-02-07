
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../Store/Provider'


export const Payment = () => {


    const sdt = useRef()
    const tenKhachHang = useRef()
    const diaChi = useRef()
    const ghiChu = useRef()
    const navigate = useNavigate()
    const { cart } = useContext(Context)
    const [disable, setDisable] = useState(false)

    const sendOTP = () => {
        setDisable(true)
        const data = {
            number: sdt.current.value
        }
        axios.post(`http://127.0.0.1:8000/auth/sendotp/`, data)
            .then((res) => {
                navigate('/Payment/Verify')
                setDisable(false)

            })
            .catch((res) => {
                toast.error('Thông tin xác thực không chính xác')
                setDisable(false)
            })
        localStorage.setItem('payment', JSON.stringify({
            soDienThoai: sdt.current.value,
            tenKhachHang: tenKhachHang.current.value,
            diaChi: diaChi.current.value,
            ghiChu: ghiChu.current.value,
            tongTien:sumSoLuong().tong
        }))
    }

    const sumSoLuong = () => {
        const soLuong = cart.reduce(function (pre, current) {
            return pre + current.soLuong
        }, 0)
        const tongTien = cart.reduce(function (pre, current) {
            return pre + current.giaBan
        }, 0)
        return {
            soLuong: soLuong,
            tongTien: tongTien,
            tong: tongTien + 30000,
        }
    }



    return (
        <div className='paying-box'>
            <div className='show-product-paying'>
                <div className='product-paying-list'>
                    <table className='table-paying'>
                        <tbody style={{ heigh: '200px' }}>
                            {
                                cart.map((c) => (
                                    <tr>
                                        <td>
                                            <img src={c.hinhAnh} alt='' />
                                            <p><strong>{c.tenLa}</strong></p>
                                        </td>
                                        <td>{c.soLuong}</td>
                                        <td>{c.giaBan}₫</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                <table className='table-paying'>
                    <tr className='under'>
                        <td>Tổng phụ</td>
                        <td>{sumSoLuong().soLuong}</td>
                        <td>{sumSoLuong().tongTien}₫</td>
                    </tr>
                    <tr>
                        <td>Chi phí vận chuyển</td>
                        <td></td>
                        <td>30000₫</td>
                    </tr>
                    <tr className='under'>
                        <th>Tổng tiền</th>
                        <th></th>
                        <th>{sumSoLuong().tong}₫</th>
                    </tr>
                </table>
            </div>
            <div div className='info-box' >
                <h2>Thông Tin Thanh Toán</h2>
                <div>
                    <input ref={tenKhachHang} placeholder='Họ và tên' disabled={disable} />
                </div>
                <div>
                    <input ref={sdt} placeholder='Số điện thoại' disabled={disable} />
                </div>
                <div>
                    <input ref={diaChi} placeholder='Địa chỉ' disabled={disable} />
                </div>
                <div>
                    <input ref={ghiChu} placeholder='Ghi chú' disabled={disable} />
                </div>
                <button
                    disabled={disable}
                    onClick={() => sendOTP()}
                    className='btn'>
                    <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}
