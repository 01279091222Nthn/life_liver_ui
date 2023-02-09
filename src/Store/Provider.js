import { useEffect, useState } from 'react'
import { createContext } from "react";

export const Context = createContext({})

export const Provider = ({ children }) => {

    const [auth, setAuth] = useState(false);
    const [result, setResult] = useState([]);
    const [cart, setCart] = useState([]);
    const [search,setSearch] = useState({
        text:'',
        filter:0,
        benh:[]
    });

    useEffect(() =>
    {

        if(localStorage["auth"]){
            setAuth(JSON.parse(localStorage.getItem('auth')))
        }
        if (localStorage["cart"]) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    },[])

    return (
        <Context.Provider
            value={{
                auth, setAuth, result, setResult, cart, setCart,search, setSearch
            }}>
            {children}
        </Context.Provider>
    )
}
