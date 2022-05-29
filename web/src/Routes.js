import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PRoute, RRoute} from './PRoute';

import Login from './pages/Login';
import Menu from './pages/Menu';
import Page404 from './pages/404';


function PageRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Page404/>}/>
                <Route exact path="/" element={<Menu/>}/>
                <Route exact path="/login" element={<Login/>}/>

{/* 
                <Route element={<RRoute/>}>
                    <Route  exact path="/" element={<Login/>}/>
                </Route>

                <Route element={<PRoute/>}>
                    <Route exact path="/menu" element = {<Menu/>}/>
                </Route> */}
            
            </Routes>
        </BrowserRouter>
    );
}

export default PageRoutes