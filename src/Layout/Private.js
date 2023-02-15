import {React} from "react";
import { Route, Routes } from "react-router";
import { AddLiver } from "../Component/AddLiver";
import { AddNews } from "../Component/AddNews";
import { AddProduct } from "../Component/AddProduct";
import Customer from "../Component/Customer";
import { LiverManager } from "../Component/LiverManager";
import Manager from "../Component/Manager";
import NewsManagement from "../Component/NewsManagement";
import { OrderDetail } from "../Component/OrderDetail";
import OrderManagement from "../Component/OrderManagement";
import ProductManagement from "../Component/ProductManagement";
import { TrainingModel } from "../Component/TrainingModel";
import { UpdateLiver } from "../Component/UpdateLiver";
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
                <Route path="Order/:maDonHang" element={<Manager><OrderDetail/></Manager>}/>
                <Route path="Liver" element={<Manager><LiverManager/></Manager>}/>
                <Route path="Liver/Add" element={<Manager><AddLiver/></Manager>}/>
                <Route path="Liver/Update/:maBenh" element={<Manager><UpdateLiver/></Manager>}/>
                <Route path="Training" element={<Manager><TrainingModel/></Manager>}/>
            </Routes>
        </>
    )
}

export default Private;