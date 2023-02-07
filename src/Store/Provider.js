import { useEffect, useState } from 'react'
import { createContext } from "react";

export const Context = createContext({})

export const Provider = ({ children }) => {

    const [auth, setAuth] = useState();
    const [result, setResult] = useState([]);
    const [cart, setCart] = useState([]);
    const [error404, setError404] = useState(true);
    const [search,setSearch] = useState({
        text:'',
        filter:0,
        benh:[]
    });

    useEffect(() =>
    {
        setAuth(true)
        if (localStorage["cart"]) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    },[])

    return (
        <Context.Provider
            value={{
                auth, setAuth, result, setResult, cart, setCart, error404, setError404, search, setSearch
            }}>
            {children}
        </Context.Provider>
    )
}
