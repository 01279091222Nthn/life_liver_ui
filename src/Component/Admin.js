import {faBox, faNewspaper, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { React, useState } from "react";
import { Link } from "react-router-dom";

const tab = [
    {
        icon: <FontAwesomeIcon icon={faBox} />,
        name: 'Quản lý sản phẩm',
        path: 'Product'
    },
    {
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        name: 'Quản lý đơn hàng',
        path: 'Order'
    },
    {
        icon: <FontAwesomeIcon icon={faNewspaper} />,
        name: 'Quản lý tin tức',
        path: 'New'
    }
];

const Admin = ({ children }) => {
    return (
        <div style={{position:'fixed',height:'100%',width:'100%'}}>
            <div style={{ backgroundColor: '#a5d0ff' }}>
                <div className="row">
                    <div className="col">
                        <img src={'../../Assets/Image/logo.png'} style={{ height: 80, width: 80 }} />
                    </div>
                    <div className="col-8">
                        
                    </div>
                    <div className="col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button className="btn btn-light" style={{ marginLeft: '10px' }}><FontAwesomeIcon icon={faUser} /></button>
                    </div>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="col">
                        {tab.map((m, i) => {
                            return (
                                <Link key={i} to={m.path} className='link'>
                                    <button className='btn btn-primary btn-lg btn-tab' style={{ width: '100%', marginBottom: '5px', display: 'flex', justifyContent: 'space-around' }}>{m.icon}{m.name}</button>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="col-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;