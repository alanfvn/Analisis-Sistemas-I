import {Outlet, Navigate} from "react-router-dom";
import {getCookie} from './util/CookieMan';

function PRoute(){
    const isAuth = getCookie('user') ?? false;
    return isAuth ? <Outlet/> : <Navigate to="/"/>
}

function RRoute(){
    const isAuth = getCookie('user') ?? false;
    return isAuth ? <Navigate to="/comercio"/> : <Outlet/>
}

export {PRoute, RRoute} 