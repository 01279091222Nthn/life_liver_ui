import { React, useContext } from "react";
import { Route, Routes } from "react-router";
import Customer from "../Component/Customer";
import Information from "../Component/Information";
import LogIn from "../Component/LogIn";
import Predition from "../Component/Predition";
import NewsDetail from "../Component/NewsDetail";
import News from "../Component/News";
import Product from "../Component/Product";
import ProductDetail from "../Component/ProductDetail";
import Cart from "../Component/Cart";
import { Paying } from "../Component/Paying";
import { Home } from "../Component/Home";
import { VerifyOTP } from "../Component/VerifyOTP";

const Public = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Customer><Home/></Customer>} />
                <Route path="Predict" element={<Customer><Predition /></Customer>} />
                <Route path="Product" element={<Customer><Product /></Customer>} />
                <Route path="News" element={<Customer><News /></Customer>} />
                <Route path="Information" element={<Customer><Information /></Customer>} />
                <Route path="LogIn" element={<Customer><LogIn /></Customer>} />
                <Route path="News/:maTinTuc" element={<Customer><NewsDetail /></Customer>} />
                <Route path="Product/:maLa" element={<Customer><ProductDetail /></Customer>} />
                <Route path="Cart" element={<Customer><Cart /></Customer>} />
                <Route path="Paying" element={<Customer><Paying/></Customer>} />
                <Route path="Verify" element={<Customer><VerifyOTP/></Customer>}/>
            </Routes>
        </>
    )
}

export default Public