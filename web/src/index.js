import React from "react";
import PageRoutes from './Routes';
import {createRoot} from 'react-dom/client';
import { loadCache } from "./util/CacheMan";

loadCache().then(()=>{
    const root = createRoot(document.getElementById('root'));
    root.render(<PageRoutes/>);
})



