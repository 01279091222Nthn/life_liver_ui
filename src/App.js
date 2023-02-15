import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { useContext } from 'react';
import { Context } from './Store/Provider';
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
