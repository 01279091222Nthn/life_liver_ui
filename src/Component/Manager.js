import { React, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Store/Provider";


const menu = [
    {
        tieude: 'Sản phẩm',
        url: '/Manager/Product',
    },
    {
        tieude: 'Tin tức',
        url: '/Manager/News',
    },
    {
        tieude: 'Hoá đơn',
        url: '/Manager/Order',
    },
    {
        tieude:'Bệnh gan',
        url:'/Manager/Liver'
    },
    {
        tieude:'Huấn luyện mô hình',
        url:'/Manager/Training'
    },
];



const Manager = ({ children }) => {

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
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className={showMenu ? 'menu-on' : 'menu-off'}>
                <button className="btn btn-icon" onClick={() => setShowMenu(!showMenu)}><i class="bi bi-x-lg"></i></button>
                <div className="menu">
                    {menu.map((m) => (
                        <Link to={m.url}><div>{m.tieude}</div></Link>
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
                    <Link to='/'>
                        <button>
                            <i class="bi bi-box-arrow-right"></i>
                        </button>
                    </Link>
                </div>
            </div>
            <div className={showMenu ? 'blur' : ''} onClick={() => setShowMenu(!showMenu)}></div>
            <div className={pos > 0 ? "header scrolled" : "header"}>
                <div className="row header-tab">
                    <div className="col-2 header-btn">
                        <button className="btn btn-icon" onClick={() => setShowMenu(!showMenu)}><i class="bi bi-list"></i></button>
                    </div>
                    <div className="col-8" style={{ display: 'flex', justifyContent: 'center' }}>
                        <img className={pos > 0 ? 'logo scrolled' : 'logo'} src="http://127.0.0.1:8000/media/uploads/z4040943532997_f4b86dab4345557c70e50901b474142b.jpg" alt="logo" />
                    </div>
                    <div className="col-2 header-btn" style={{ display: 'flex' }}>
                    </div>
                </div>
            </div>
            <div>
                {/* Phần body */}
                <div className="row" style={{ height: '80px' }}></div>
                <div className="row">
                    <div className="col">
                        {children}
                    </div>
                </div>
                <div className="footer">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="text-bold">Giới thiệu</p>
                            <p>Website tra cứu và mua dược liệu điều trị bệnh gan</p>
                            <p className="text-bold">Thành viên</p>
                            <p>Phạm Hoàng Hiệp</p>
                            <p>Ngô Thuỵ Hồng Ngọc</p>
                            <p>Nguyễn Hải Đăng</p>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <p className="text-bold">Địa chỉ</p>
                                    <p>140 Lê Trọng Tấn, Tây Thạnh, Tân Phú</p>
                                    <p className="text-bold">Hotline</p>
                                    <p>0815734366</p>
                                </div>
                                <div className="col-12 col-md-6 menu-social">
                                    <a href={'https://www.facebook.com/profile.php?id=100090006040777'} target="_blank">
                                        <button>
                                            <i class="bi bi-facebook"></i>
                                        </button>
                                    </a>
                                    <a>
                                        <button>
                                            <i class="bi bi-youtube"></i>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <p className="copyright">Copyright 2023 | Liver Life</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manager