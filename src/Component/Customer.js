import { faMagnifyingGlass, faHome, faBox, faNewspaper, faInfoCircle, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { React } from "react";
import { Link } from "react-router-dom";


const tab = [
    {
        icon: <FontAwesomeIcon icon={faHome} />,
        name: 'Trang chủ',
        path: '/'
    },
    {
        icon: <FontAwesomeIcon icon={faBox} />,
        name: 'Sản Phẩm',
        path: '/Card'
    },
    {
        icon: <FontAwesomeIcon icon={faNewspaper} />,
        name: 'Tin tức',
        path: '/New'
    },
    {
        icon: <FontAwesomeIcon icon={faInfoCircle} />,
        name: 'Thông tin',
        path: '/Information'
    }
];


const Customer = ({ children }) => {

    return (
        <div style={{ position: 'fixed', height: '100%', width: '100%' }}>
            <div style={{ backgroundColor: '#a5d0ff' }}>
                <div className="row">
                    <div className="col">
                        <img src={'../../Assets/Image/logo.png'} style={{ height: 80, width: 80 }} />
                    </div>
                    <div className="col-8">
                        <div className="input-group mb-3" style={{ margin: '20px' }}>
                            <input type="text" className="form-control" placeholder="Nhập để tìm kiếm" />
                            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
                        </div>
                    </div>
                    <div className="col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button className="btn btn-light"><FontAwesomeIcon icon={faCartShopping} /></button>
                        <Link to={"/LogIn"} className='link'><button className="btn btn-light" style={{ marginLeft: '10px' }}><FontAwesomeIcon icon={faUser} /></button></Link>
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

export default Customer