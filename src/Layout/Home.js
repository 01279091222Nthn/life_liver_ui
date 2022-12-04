import { React } from "react";
import { Route, Router, Routes } from "react-router";
import Card from "../Component/Card";
import Customer from "../Component/Customer";
import Information from "../Component/Information";
import LogIn from "../Component/LogIn";
import New from "../Component/New";
import NewItem from "../Component/NewItem";
import Predition from "../Component/Predition";
import Dialog from "../Component/Dialog";

const product = [
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
    {
        img: 'Assets/Image/logo.png',
        name: 'cdcadcdc'
    },
]


const Home = () => {
    return (
        <>
            <Dialog/>
            <Routes>
                <Route path="/" element={<Customer><Predition /></Customer>} />
                <Route path="Card" element={<Customer><Card data={product} /></Customer>} />
                <Route path="New" element={<Customer><New data={product} /></Customer>} />
                <Route path="Information" element={<Customer><Information /></Customer>} />
                <Route path="LogIn" element={<LogIn />} />
                <Route path="New/*" element={<Customer><NewItem /></Customer>} />
            </Routes>
        </>
    )
}

export default Home