import {React} from "react";
import { Route, Routes } from "react-router";
import { AddNews } from "../Component/AddNews";
import { AddProduct } from "../Component/AddProduct";
import Manager from "../Component/Manager";
import NewsManagement from "../Component/NewsManagement";
import OrderManagement from "../Component/OrderManagement";
import ProductManagement from "../Component/ProductManagement";
import { UpdateNews } from "../Component/UpdateNews";
import UpdateProduct from "../Component/UpdateProduct";


const Private = () => {
    return (
        <>
            <Routes>
                <Route path="Product" element={<Manager><ProductManagement/></Manager>}/>
                <Route path="Order" element={<Manager><OrderManagement/></Manager>}/>
                <Route path="News" element={<Manager><NewsManagement/></Manager>}/>
                <Route path="Product/Add" element={<Manager><AddProduct/></Manager>}/>
                <Route path="Product/Update/:maLa" element={<Manager><UpdateProduct/></Manager>}/>
                <Route path="News/Add" element={<Manager><AddNews/></Manager>}/>
                <Route path="News/Update/:maTinTuc" element={<Manager><UpdateNews/></Manager>}/>
            </Routes>
        </>
    )
}

export default Private;