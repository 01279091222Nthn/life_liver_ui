import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../Store/Provider";
import 'react-quill/dist/quill.snow.css';

const ProductDetail = () => {

  const [product, setProduct] = useState([])
  const params = useParams()
  const { cart, setCart } = useContext(Context)

  const updateSL = (val) => {
    if (!cart.some((d) => product.maLa === d.maLa)) {
      setCart((data) => [...data, { maLa: product.maLa, soLuong: 1, tenLa: product.tenLa, giaBan: product.giaBan }]);
    }
    else {
      let newCart = cart.map((c) => params.maLa === c.maLa ? { ...c, soLuong: c.soLuong + val } : c)
      newCart = newCart.filter(c => c.soLuong > 0)
      setCart(newCart)
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
            <button className="btn btn-submit">Mua ngay</button>
          </div>
        </div>
        <div class="ql-editor" dangerouslySetInnerHTML={{ __html: product.noiDungKhac }}>
        </div>
      </div>
    </>
  )
}
export default ProductDetail;