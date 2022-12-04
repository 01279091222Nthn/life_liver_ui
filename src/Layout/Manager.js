import {React} from "react";
import { Route, Router, Routes } from "react-router";
import Admin from "../Component/Admin";


const Manager = () => {
    return (
        <>
            <Routes>
                <Route path="" element={<Admin></Admin>}/>
            </Routes>
        </>
    )
}

export default Manager;