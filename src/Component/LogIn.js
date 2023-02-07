import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from "../Store/Provider";

const LogIn = () => {

    const [show, setShow] = useState(false)

    const { setAuth } = useContext(Context)
    return (
        <>
            <div className="info-box">
                <h2>Đăng nhập quản trị viên</h2>
                <div>
                    <input placeholder="Tên đăng nhập"/>
                </div>
                <div>
                    <input className="password" type={show === true ? 'text' : 'password'} placeholder="Mật khẩu" />
                    <button className="eyes" onClick={() => setShow(!show)}>{show === true ? <i class="bi bi-eye"></i> : <i class="bi bi-eye-slash"></i>}</button>
                </div>
                <button className='btn btn-primary '>Xác nhận</button>
            </div>
        </>
    )
}

export default LogIn;