import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { useContext } from 'react';
import { Context } from './Store/Provider';
import { Error404 } from './Component/Error404';
import Private from './Layout/Private';
import Public from './Layout/Public';



function App() {
    const {auth, error404} = useContext(Context)
    return (
        <>
            <Router>
                {error404?
                    <Routes>
                        {auth ?
                            <Route path='Manager/*' element={<Private/>}></Route>
                            :
                            null
                        }
                        <Route path='/*' element={<Public/>}></Route>
                    </Routes>
                    :
                    <Routes>
                        <Route path="*" element={<Error404/>} />
                    </Routes>
                }
            </Router>
        </>
    );
}

export default App;
