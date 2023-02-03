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
    }

    const updateSL = (index, val) => {
        const newCart = cart.map((c, i) => index === i ? { ...c, soLuong: c.soLuong + val } : c)
        setCart(newCart)
    }

    const onChangeSL = (index, e) => {
        const newCart = cart.map((c, i) => index === i ? { ...c, soLuong: e.target.value } : c)
        setCart(newCart)
    }

    useEffect(() => {
        updateAmount()
    }, [removeProduct])

    return (
        <div className="row">
            {/* <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Giá bán</th>
                            <th scope="col">Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length === 0 ?
                            <tr>
                                <td colSpan={3}>Chưa có sản phẩm</td>
                            </tr> :
                            cart.map((c, i) => (
                                <tr key={c.maLa}>
                                    <td>{c.tenLa}</td>
                                    <td>{c.giaBan}</td>
                                    <td>
                                        <div style={{ display: 'inline' }}>
                                            <div className="add-product">
                                                <i class="bi bi-dash-circle"
                                                    onClick={() => (
                                                        c.soLuong > 1 ? updateSL(i, -1) : ''
                                                    )}></i>
                                                <input value={c.soLuong} />
                                                <i class="bi bi-plus-circle"
                                                    onClick={() => updateSL(i, 1)}></i>
                                            </div>
                                        </div>
                                        <button className="btn btn-feature delete"
                                            onClick={() => removeProduct(c.maLa, i)}>
                                            <i class="bi bi-x-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>{
                        amount > 0 ?
                            <tfoot>
                                <tr>
                                    <td colSpan={3}>
                                        <div style={{ display: 'flex', float: 'right', alignItems: 'center' }}>
                                            <h5 style={{ margin: 'auto 10px' }}>{amount}</h5>
                                            <Link to='/Paying' className="link" ><button className="btn btn-submit ">Thanh toán</button></Link>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                            :
                            null}
                </table> */}
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
                            <button className={cart.length > 0 ? "thanhtoan" : "khongthanhtoan"} onClick={() => cart.length > 0 ? navigate('/Paying') : ''}>
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