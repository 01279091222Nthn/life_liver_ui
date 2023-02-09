import { React, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Context } from "../Store/Provider";
import axios from "axios";

const LogIn = () => {

    const [show, setShow] = useState(false)
    const {setAuth} = useContext(Context)
    const maDangNhap = useRef()
    const matKhau = useRef()

    const navigate = useNavigate()

    const onClickLogin = () =>{
        const data = {
            "maDangNhap":maDangNhap.current.value,
            "matKhau":matKhau.current.value
        }
        axios.post('http://127.0.0.1:8000/dangnhap/',data,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        .then((res)=>{
            localStorage.setItem('auth',true)
            setAuth(true)
            navigate('/Manager/Product')
        })
        .catch((res)=>{
            console.log('login failed')
        })
    }

    return (
        <>
            <div className="info-box">
                <h2>Đăng nhập quản trị viên</h2>
                <div>
                    <input ref={maDangNhap} placeholder="Tên đăng nhập"/>
                </div>
                <div>
                    <input ref={matKhau} className="password" type={show === true ? 'text' : 'password'} placeholder="Mật khẩu" />
                    <button className="eyes" onClick={() => setShow(!show)}>{show === true ? <i class="bi bi-eye"></i> : <i class="bi bi-eye-slash"></i>}</button>
                </div>
                <button className='btn' onClick={()=>onClickLogin()}>Xác nhận</button>
            </div>
        </>
    )
}

export default LogIn;