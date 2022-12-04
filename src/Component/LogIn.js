import { React } from "react";

import { useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../Store/Provider";

const LogIn = () => {

    const {setAuth}=useContext(Context)
    return (
        <>
            <div className="wrapper">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please login</h2>
                    <input type="text" className="form-control" name="username" placeholder="Email Address" required="" autoFocus="" />
                    <input type="password" className="form-control" name="password" placeholder="Password" required="" />
                    <label className="checkbox">
                        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/>
                        
                    </label>
                    <Link to={"/Manager"} className='link'><button className="btn btn-lg btn-primary btn-block" type="submit" onClick={()=>setAuth(true)}>Login</button></Link>
                </form>
            </div>
        </>
    )
}

export default LogIn;