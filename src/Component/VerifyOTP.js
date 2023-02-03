import axios from 'axios'
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast'

export const VerifyOTP = () => {
    const otp = useRef()

    const verifyOTP = () =>{
        const data={
            'otp':otp.current.value
        }
        axios.post(`http://127.0.0.1:8000/auth/verify/`,data,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res)=>{
            
        })
        .catch((res)=>{
            toast.error('Mã xác thực không chính xác')
        })
    }

    const postKhachHang = () =>{
        const data = {
            hoTen:'',
            soDienThoai:'0815734366',
            diaChi:'',
            ghiChu:'' 
        }
        axios.post(`http://127.0.0.1:8000/tintuc/`,data)
        .then((res)=>{

        })
        .catch((res)=>{
            
        })
    }

    return (
        <div>
            <div className='paying-box'>
                <h2>Xác thực OTP</h2>
                <div>
                    <input ref={otp} placeholder='Nhập mã OTP để thanh toán' />
                </div>
                <button
                    onClick={() => verifyOTP()}
                    className='btn btn-primary'>Xác thực</button>
            </div>
        </div>
    )
}
