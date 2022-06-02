import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PRoute, RRoute} from './PRoute';

import Menu from './pages/Menu';
import Page404 from './pages/404';
import Comercio from "./pages/Comercio";
import Sucursales from "./pages/Sucursales";
import Quejas from './pages/Quejas';
import About from './pages/About';


function PageRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                {/* rutas desprotegidas. */}
                <Route path="*" element={<Page404/>}/>
                <Route exact path="/about" element={<About/>}/>

                {/* redireccion de rutas. */}
                <Route element={<RRoute/>}>
                    <Route exact path="/" element={<Menu/>}/>
                </Route>

                {/* rutas protegidas. */}
                <Route element={<PRoute/>}>
                    <Route exact path="/comercio" element={<Comercio/>}/>
                    <Route exact path="/sucursales" element={<Sucursales/>}/>
                    <Route exact path="/quejas" element={<Quejas/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default PageRoutes