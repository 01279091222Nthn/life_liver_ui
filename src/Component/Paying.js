
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../Store/Provider'


export const Paying = () => {


    const sdt = useRef()
    const navigate = useNavigate()
    const { cart } = useContext(Context)

    const sendOTP = () => {
        const data = {
            number: sdt.current.value
        }
        axios.post(`http://127.0.0.1:8000/auth/sendotp/`, data)
            .then((res) => {
                navigate('/Verify')
            })
            .catch((res) => {
                toast.error('Thông tin xác thực không chính xác')
            })
    }

    const sumSoLuong = () => {
        const soLuong = cart.reduce(function (pre, current) {
            return pre + current.soLuong
        }, 0)
        const tongTien = cart.reduce(function (pre, current) {
            return pre + current.giaBan
        }, 0)
        return {
            soLuong: soLuong,
            tongTien: tongTien,
            tong: tongTien + 30000,
        }
    }

    return (
        <div className='paying-box'>
            <div className='show-product-paying'>
                <div className='product-paying-list'>
                    <table className='table-paying'>
                        <tbody style={{ heigh: '200px' }}>
                            {
                                cart.map((c) => (
                                    <tr>
                                        <td>
                                            <img src={c.hinhAnh} alt='' />
                                            <p><strong>{c.tenLa}</strong></p>
                                        </td>
                                        <td>{c.soLuong}</td>
                                        <td>{c.giaBan}₫</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                <table className='table-paying'>
                    <tr className='under'>
                        <td>Tổng phụ</td>
                        <td>{sumSoLuong().soLuong}</td>
                        <td>{sumSoLuong().tongTien}₫</td>
                    </tr>
                    <tr>
                        <td>Chi phí vận chuyển</td>
                        <td></td>
                        <td>30000₫</td>
                    </tr>
                    <tr className='under'>
                        <th>Tổng tiền</th>
                        <th></th>
                        <th>{sumSoLuong().tong}₫</th>
                    </tr>
                </table>
            </div>
            <div className='info-box'>
                <h2>Thông Tin Thanh Toán</h2>
                <div>
                    <input placeholder='Họ và tên' />
                </div>
                <div>
                    <input ref={sdt} placeholder='Số điện thoại' />
                </div>
                <div>
                    <input placeholder='Địa chỉ' />
                </div>
                <div>
                    <input placeholder='Ghi chú' />
                </div>
                <button
                    onClick={() => sendOTP()}
                    className='btn'>Xác nhận</button>
            </div>

        </div>
    )
}
