import {  useEffect, useState } from 'react'
import { createContext } from "react";

export const Context = createContext({})

export const Provider = ({children}) =>{

    const [auth,setAuth]=useState()

    useEffect(()=>
        setAuth(false)
    ,[])
    return(
        <Context.Provider value={{auth,setAuth}}>
            {children}
        </Context.Provider>
    )
}
