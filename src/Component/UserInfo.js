import axios from 'axios'
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'

export const UserInfo = () => {

    const sdt= useRef()
    const navigate = useNavigate()

    const sendOTP = () =>{
        const data={
            number:sdt.current.value
        }
        axios.post(`http://127.0.0.1:8000/auth/sendotp/`,data)
        .then((res)=>{
            navigate('/Verify')
        })
        .catch((res)=>{
            toast.error('Thông tin xác thực không chính xác')
        })
    }

    return (
        <div className='paying-box'>
            <h2>Thông Tin Thanh Toán</h2>
            <div>
                <input placeholder='Họ và tên' />
            </div>
            <div>
                <input ref={sdt} placeholder='Số điện thoại' />
            </div>
            <div>
                <input placeholder='Địa chỉ' />
            </div>
            <div>
                <input placeholder='Ghi chú' />
            </div>
            <button
                onClick={() => sendOTP()}
                className='btn btn-primary'>Xác nhận</button>
        </div>
    )
}
