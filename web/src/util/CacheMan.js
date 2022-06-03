import HttpMan from "./HttpMan";

let locations = {};
let categories = [];

async function loadCache(){
    const resp = await HttpMan.get('/get_locations');
    const resp2 = await HttpMan.get('/get_categories');

    locations = resp.data;
    categories = resp2.data;
}


function getDepartamentos(){  
    let deps = Object.fromEntries(Object.entries(locations).map(([k, v]) => {
        return [k,v["departamento"]];
    }));
    return deps;
}

function getMunicipios(id){
    let locs = locations[id]["municipios"] ?? {};
    return locs;
}


function getCategories(){

    return categories;
}

export {loadCache, getDepartamentos, getMunicipios, getCategories};