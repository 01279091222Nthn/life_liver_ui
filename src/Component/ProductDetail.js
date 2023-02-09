import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../Store/Provider";
import 'react-quill/dist/quill.snow.css';

const ProductDetail = () => {

  const [product, setProduct] = useState([])
  const params = useParams()
  const { cart, setCart } = useContext(Context)

  const updateCart = (maLa, soLuong, tenLa, giaBan, hinhAnh) => {
    if (!cart.some((d) => maLa === d.maLa)) {
      const newCart = [...cart, { maLa, soLuong, tenLa, giaBan, hinhAnh }];
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  useEffect(() => {
    const GetData = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8000/lathuoc/${params.maLa}/`
      ).then((res) => {
        setProduct(res.data);
      }).catch((res) => {
      })
    }
    GetData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="product-detail">
        <div className="product-main">
          <div className="">
            <img src={product.hinhAnh} alt="" />
          </div>
          <div className="">
            <h3 className="product-name">{product.tenLa}</h3>
            <p>Tên khác: {product.tenKhac}</p>
            <p>Tên khoa học: {product.tenKhoaHoc}</p>
            <p>{product.giaBan} ₫ - 100gram</p>
            <button
              className="btn btn-icon-card"
              style={{backgroundColor:'#039B7B'}}
              onClick={() => updateCart(product.maLa, 1, product.tenLa, product.giaBan, product.hinhAnh)}>
              <i class="bi bi-bag"></i>
            </button>
          </div>
        </div>
        <div class="ql-editor" dangerouslySetInnerHTML={{ __html: product.noiDungKhac }}>
        </div>
      </div>
    </>
  )
}
export default ProductDetail;