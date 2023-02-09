import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { useContext } from 'react';
import { Context } from './Store/Provider';
import { Error404 } from './Component/Error404';
import Private from './Layout/Private';
import Public from './Layout/Public';



function App() {
    const {auth} = useContext(Context)
    return (
        <>
            <Router>
                    <Routes>
                        {auth?
                            <Route path='Manager/*' element={<Private/>}></Route>
                            :
                            <></>
                        }
                        <Route path='/*' element={<Public/>}></Route>
                    </Routes>
            </Router>
        </>
    );
}

export default App;
