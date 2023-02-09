import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../Store/Provider";



export const Cart = () => {


    const { cart, setCart } = useContext(Context)
    const [amount, setAmount] = useState()
    const navigate = useNavigate()

    const updateAmount = () => {
        let newAmount = 0;
        cart.forEach((c, i) => {
            newAmount += c.giaBan * c.soLuong;
        });
        setAmount(newAmount);
    }

    const removeProduct = (mala, index) => {
        const newCart = cart.filter(c => c.maLa !== mala)
        setCart(newCart)
        localStorage.setItem('cart',JSON.stringify(newCart))
    }

    const updateSL = (index, val) => {
        const newCart = cart.map((c, i) => index === i ? { ...c, soLuong: c.soLuong + val } : c)
        setCart(newCart)
        localStorage.setItem('cart',JSON.stringify(newCart))
    }

    const onChangeSL = (index, e) => {
        const newCart = cart.map((c, i) => index === i ? { ...c, soLuong: e.target.value } : c)
        setCart(newCart)
        localStorage.setItem('cart',JSON.stringify(newCart))
    }

    useEffect(() => {
        updateAmount()
    }, [removeProduct])

    return (
        <div className="row">
            <div className="col-12 col-md-6">
                {cart.length === 0 ?
                    <></> :
                    cart.map((c, i) => (
                        <div key={c.maLa} className="shopping-cart row">
                            <div className="col-6">
                                <img src={c.hinhAnh} />
                            </div>
                            <div className="col-6">
                                <p><strong>{c.tenLa}</strong></p>
                                <p>{c.giaBan}₫</p>
                                <div>
                                    <div className='input-quantity'>
                                        <div className="add-product">
                                            <button onClick={() => (c.soLuong > 1 ? updateSL(i, -1) : '')}>
                                                <i class="bi bi-dash-lg"></i>
                                            </button>
                                            <input defaultValue={c.soLuong} key={c.soLuong} onChange={(e) => onChangeSL(i, e)} />
                                            <button onClick={() => updateSL(i, 1)}>
                                                <i class="bi bi-plus-lg" ></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="rm-product" onClick={() => removeProduct(c.maLa, i)}>
                                        Xoá sản phẩm
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="col-12 col-md-6">
                <div className="summary-cart">
                    <p><h3>Tổng</h3></p>
                    <div className="total-cart">
                        {amount}₫
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Link to='/Product'>
                                <button>
                                    Tiếp tục mua hàng
                                </button>
                            </Link>
                        </div>
                        <div className="col-12 col-md-6">
                            <button className={cart.length > 0 ? "thanhtoan" : "khongthanhtoan"} onClick={() => cart.length > 0 ? navigate('/Payment') : ''}>
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;