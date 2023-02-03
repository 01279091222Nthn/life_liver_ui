import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from "../Store/Provider";

const LogIn = () => {

    const [show, setShow] = useState(false)

    const { setAuth } = useContext(Context)
    return (
        <>
            <div className="paying-box">
                <h2>Đăng nhập quản trị viên</h2>
                <div>
                    <input placeholder="Tên đăng nhập"/>
                </div>
                <div>
                    <input className="password" type={show === true ? 'text' : 'password'} placeholder="Mật khẩu" />
                    <button onClick={() => setShow(!show)}>{show === true ? <i class="bi bi-eye"></i> : <i class="bi bi-eye-slash"></i>}</button>
                </div>
                <button className='btn btn-primary '>Xác nhận</button>
                {/* <p>
                    <span style={{ color: '#039B7B' }}>
                        <Link to={'/Login'}>
                            Đăng ký
                        </Link>
                    </span>
                    <span> | </span>
                    <span>
                        <Link to={'/Login'}>
                            Quên mật khẩu
                        </Link>
                    </span>
                </p> */}
            </div>
        </>
    )
}

export default LogIn;