import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Layout/Home'
import { useState } from 'react';
import Manager from './Layout/Manager';
import { useContext } from 'react';
import { Context } from './Store/Provider';



function App() {
    const {auth} = useContext(Context)
    return (
        <>
            <Router>
                {
                    <Routes>
                        {auth ?
                            <Route path='Manager/*' element={<Manager />}></Route>
                            :
                            null
                        }
                        <Route path='/*' element={<Home />}></Route>
                    </Routes>
                }
            </Router>
        </>
    );
}

export default App;
