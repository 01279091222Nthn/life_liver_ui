import { React, useContext } from "react";
import { Route, Routes } from "react-router";
import Customer from "../Component/Customer";
import AboutUs from "../Component/AboutUs";
import LogIn from "../Component/LogIn";
import Predition from "../Component/Predition";
import NewsDetail from "../Component/NewsDetail";
import News from "../Component/News";
import Product from "../Component/Product";
import ProductDetail from "../Component/ProductDetail";
import Cart from "../Component/Cart";
import { Home } from "../Component/Home";
import { VerifyOTP } from "../Component/VerifyOTP";
import { Payment } from "../Component/Payment";
import SuccessPayment from "../Component/SuccessPayment";

const Public = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Customer><Home/></Customer>} />
                <Route path="Predict" element={<Customer><Predition /></Customer>} />
                <Route path="Product" element={<Customer><Product /></Customer>} />
                <Route path="News" element={<Customer><News /></Customer>} />
                <Route path="AboutUs" element={<Customer><AboutUs/></Customer>} />
                <Route path="Login" element={<Customer><LogIn/></Customer>} />
                <Route path="News/:maTinTuc" element={<Customer><NewsDetail /></Customer>} />
                <Route path="Product/:maLa" element={<Customer><ProductDetail /></Customer>} />
                <Route path="Cart" element={<Customer><Cart /></Customer>} />
                <Route path="Payment" element={<Customer><Payment/></Customer>} />
                <Route path="Payment/Verify" element={<Customer><VerifyOTP/></Customer>}/>
                <Route path="Payment/Success" element={<Customer><SuccessPayment/></Customer>} />
            </Routes>
        </>
    )
}

export default Public