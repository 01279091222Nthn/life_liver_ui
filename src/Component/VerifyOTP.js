import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { Context } from '../Store/Provider'

export const VerifyOTP = () => {
    const otp = useRef()
    const navigate = useNavigate()
    const [payment, setPayment] = useState()
    const { cart } = useContext(Context)
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        setPayment(JSON.parse(localStorage.getItem('payment')))
    }, [])

    const verifyOTP = () => {
        const data = {
            'otp': otp.current.value
        }
        setDisable(true)
        axios.post(`http://127.0.0.1:8000/auth/verify/`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                navigate('/Payment/Success')
                postKhachHang()
                setDisable(false)
            })
            .catch((res) => {
                toast.error('Mã xác thực không chính xác')
            })
    }

    const postKhachHang = () => {

        const date = new Date()
        var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        console.log(isoDateTime);

        const customer = {
            maKhachHang:payment.soDienThoai.slice(-4) + date.getTime().toString(),
            tenKhachHang: payment.tenKhachHang,
            soDienThoai: payment.soDienThoai,
            diaChi: payment.diaChi,
        }

        const donhang = {
            maDonHang: payment.soDienThoai.slice(-4) + date.getTime().toString(),
            maKhachHang: payment.soDienThoai.slice(-4) + date.getTime().toString(),
            ngayLap: isoDateTime,
            tongTien: payment.tongTien,
            trangThai: 0,
            ghiChu: payment.ghiChu
        }

        const ctdonhang = {
            'maDonHang': payment.soDienThoai.slice(-4) + date.getTime().toString(),
            'soLuong': cart.map(c => c.soLuong),
            'maLa': cart.map(c => c.maLa),
        }

        axios.post(`http://127.0.0.1:8000/khachhang/`, customer)
            .then((res) => {
                axios.post('http://127.0.0.1:8000/donhang/', donhang)
                    .then((res) => {
                        axios.post('http://127.0.0.1:8000/ctdonhang/', ctdonhang, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            }
                        })
                            .then((res) => {
                                navigate('/Payment/Success')
                            })
                            .catch((res) => {

                            })
                    })
                    .catch((res) => {

                    })
            })
            .catch((res) => {

            })
    }

    return (
        <div>
            <div className='info-box' style={{ margin: '0 auto' }}>
                <h2>Xác nhận OTP</h2>
                <div>
                    <input disabled={disable} placeholder='OTP' ref={otp} style={{ textAlign: 'center' }} />
                </div>
                <button
                    onClick={() => verifyOTP()}
                    className='btn'
                >Xác nhận</button>
            </div>
        </div>
    )
}
