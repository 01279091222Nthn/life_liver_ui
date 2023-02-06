import axios from 'axios'
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'

export const VerifyOTP = () => {
    const otp = useRef()
    const navigate = useNavigate()

    const verifyOTP = () => {
        const data = {
            'otp': otp.current.value
        }
        axios.post(`http://127.0.0.1:8000/auth/verify/`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                navigate('/Payment/Success')
            })
            .catch((res) => {
                toast.error('Mã xác thực không chính xác')
            })
    }

    const postKhachHang = () => {
        const data = {
            hoTen: '',
            soDienThoai: '0815734366',
            diaChi: '',
            ghiChu: ''
        }
        axios.post(`http://127.0.0.1:8000/tintuc/`, data)
            .then((res) => {

            })
            .catch((res) => {

            })
    }

    return (
        <div>
            <div className='info-box' style={{margin:'0 auto'}}>
                <h2>Xác nhận OTP</h2>
                <div>
                    <input placeholder='OTP' ref={otp} style={{ textAlign: 'center' }} />
                </div>
                <button
                    onClick={()=>verifyOTP()}
                    className='btn'
                >Xác nhận</button>
            </div>
        </div>
    )
}
