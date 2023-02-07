import { React, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context } from "../Store/Provider";
import Dialog from "./Dialog";
import { DialogSearch } from "./DialogSearch";

const menu = [
    {
        tieude: 'Trang chủ',
        url: '/',
    },
    {
        tieude: 'Sản phẩm',
        url: '/Product',
    },
    {
        tieude: 'Tin tức',
        url: '/News',
    },
    {
        tieude: 'Về chúng tôi',
        url: '/AboutUs',
    },
];

const Customer = ({ children }) => {



    const { cart } = useContext(Context)
    const [index, setIndex] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    const [pos, setPos] = useState(0)

    const updatePos = () => {
        setPos(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", updatePos);
        //removes the eventlistener when the component is unmounted
        return () => {
            window.removeEventListener("scroll", updatePos);
        };
    }, [])


    return (
        <div style={{ fontFamily: 'Montserrat' }}>
            <Dialog />
            <DialogSearch />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className={showMenu ? 'menu-on' : 'menu-off'}>
                <button className="btn btn-icon" onClick={() => setShowMenu(!showMenu)}><i class="bi bi-x-lg"></i></button>
                <div className="menu">
                    {menu.map((m, i) => (
                        <Link key={i} to={m.url}><div>{m.tieude}</div></Link>
                    ))}
                </div>
                <div className="menu-social">
                    <a href={'https://www.facebook.com/profile.php?id=100090006040777'} target="_blank">
                        <button>
                            <i class="bi bi-facebook"></i>
                        </button>
                    </a>
                    <Link>
                        <button>
                            <i class="bi bi-youtube"></i>
                        </button>
                    </Link>
                </div>
            </div>
            <div className={showMenu ? 'blur' : ''} onClick={() => setShowMenu(!showMenu)}></div>
            <div className={pos > 0 ? 'header scrolled' : 'header'}>
                <div className="row header-tab">
                    <div className="col-2 header-btn">
                        <button className="btn btn-icon" onClick={() => setShowMenu(!showMenu)}><i class="bi bi-list"></i></button>
                    </div>
                    <div className="col-8">
                        <img className={pos > 0 ? 'logo scrolled' : 'logo'} src="http://127.0.0.1:8000/media/uploads/z4040943532997_f4b86dab4345557c70e50901b474142b.jpg" alt="logo" />
                    </div>
                    <div className="col-2 header-btn" style={{ display: 'flex' }}>
                        <button className="btn btn-icon" data-toggle="modal" data-target="#search"><i class="bi bi-search"></i></button>
                        <button className="btn btn-icon" data-toggle="modal" data-target="#detection"><i class="bi bi-image"></i></button>
                        <Link to={'/Cart'} className='link'>
                            <button className="btn btn-icon" style={{position:'relative'}}>
                                <i class="bi bi-cart"></i>
                                {cart.length>0?
                                <span className="cart-num">{cart.length}</span>
                                :<></>}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div style={{ paddingLeft: '10px', position: 'relative' }}>
                {/* Phần body */}
                <div className="row" style={{ height: '80px' }}></div>
                <div className="row">
                    <div className="col">
                        {children}
                    </div>
                </div>
                {/* Phần footer */}
                <footer className="row">
                    <div className="footer">
                        <div className="row">
                            <div className="col">
                                <p className="text-bold">Giới thiệu</p>
                                <p>Trang web dự đoán và bán sản phẩm lá thuốc trị bệnh gan</p>
                                <p className="text-bold">Thành viên</p>
                                <p>Phạm Hoàng Hiệp</p>
                                <p>Ngô Thuỵ Hồng Ngọc</p>
                                <p>Nguyễn Hải Đăng</p>
                            </div>
                            <div className="col">
                                <p className="text-bold">Liên hệ</p>
                                <p>140 Lê Trọng Tấn, phường Tây Thạnh, quận Tân Phú, TP.HCM</p>
                                <p>2001190449@hufi.edu.vn</p>
                            </div>
                            <div className="col">
                                <Link to='/' className="link"><p>Trang chủ</p></Link>
                                <Link to='/Product' className="link"><p>Sản Phẩm</p></Link>
                            </div>
                        </div>
                        <a className="line-footer"></a>
                        <p style={{ margin: 'auto' }}>@BOGAN 2022</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Customer