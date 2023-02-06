import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store/Provider";


const Product = () => {

  const [data, setData] = useState([])
  const { setCart, cart, search } = useContext(Context)

  useEffect(() => {
    const GetData = async () => {
      const url = `http://127.0.0.1:8000/lathuoc/search/`
      let data = {
        'tenLa': search.text,
        'maBenh': search.benh
      }
      axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          setData(res.data)
        })
    }
    GetData();
  }, [search]);

  const updateCart = (maLa, soLuong, tenLa, giaBan, hinhAnh) => {
    if (!cart.some((d) => maLa === d.maLa)) {
      const newCart = [...cart, { maLa, soLuong, tenLa, giaBan, hinhAnh}];
      setCart(newCart)
      localStorage.setItem('cart',JSON.stringify(newCart))
    }
  }

  return (
    <>
      <p className="bread">
        <span>Sản phẩm</span>
        {
          search.text.length > 0 ?
          <>
            <i class="bi bi-chevron-right" />
            <span>{search.text}</span>
          </>
          : ''
        }
      </p>
      <div className="grid-product">
        {data.map((d, i) => (
          <div className="grid-card" key={i}>
            <div key={i} className="card">
              <div style={{ display: 'flex', height: 150, justifyContent: 'center' }}>
                <img src={d.hinhAnh} style={{ maxHeight: '140px', maxWidth: '160px', borderRadius: '3px', marginTop: '10px' }} alt='' />
              </div>
              <div className="card-body">
                <h4 className="card-title">{d.tenLa}</h4>
                <p className="card-text" >{d.giaBan}₫ - 100g</p>
                <button className="btn btn-icon-card" onClick={() => updateCart(d.maLa, 1, d.tenLa, d.giaBan, d.hinhAnh)}>
                  <i class="bi bi-bag"></i>
                </button>
                <Link to={d.maLa} className='link'>
                  <button className="btn btn-icon-card">
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>))}
      </div>
    </>
  )
}

export default Product;