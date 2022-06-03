const {verifyUser, loadShops, loadCategories, loadLocations, loadSucursal, loadQueja, insertQueja, insertarComercio, insertarSucursal, borrarComercio, borrarSucursal} = require('../database/db-man');



//post requests.
const postLogin = async (req, res) => {
    
    const {user, password} = req.body;
    const data = await verifyUser(user, password);
    const uname = data[0]["iniciar_sesion"];
    
    if(!uname){
        res.status(401).end();
        return;
    }
    res.json({username: uname});
}


const postQueja = async (req, res) => {
    const {sucursal, categoria, queja} = req.body;
    const data = await insertQueja(parseInt(sucursal), parseInt(categoria), queja);
    res.json(data);
}

const postComercio = async (req, res) => {
    const {id, comercio, propietarios} = req.body;
    const data = await insertarComercio(id, comercio, propietarios);
    res.json(data);
}

const postSucursal = async (req, res) => {
    const {id, comercio, municipio, sucursal} = req.body;
    const data = await insertarSucursal(id, parseInt(comercio), parseInt(municipio), sucursal);
    res.json(data);
}


//delete requests.
const deleteComercio = async (req, res) =>{
    const {id} = req.body;
    const data = await borrarComercio(id);
    res.json(data);
}

const deleteSucursal = async (req, res) =>{
    const {id} = req.body;
    const data = await borrarSucursal(id);
    res.json(data);
}


//get requests.
const getShops = async (req, res) => {
    const resp = await loadShops();
    res.json(resp);
}

const getCategories = async (req, res) =>{
    const resp = await loadCategories();
    res.json(resp);
}

const getLocations = async (req, res)=>{
    const resp = await loadLocations();
    const locations = {}

    for(const data of resp){
        const {id_departamento, nombre_departamento, 
            id_municipio, nombre_municipio} = data;

        if(!(id_departamento in locations)){
            locations[id_departamento] = {
                "departamento": nombre_departamento,
                "municipios": {
                    [id_municipio]: nombre_municipio,
                } 
            }
        }else{
            locations[id_departamento]
            .municipios[id_municipio] = nombre_municipio;
        }   
    }



    res.json(locations);
}

const getSucursals = async (req, res) =>{
    const resp = await loadSucursal();
    res.json(resp);
}

const getQuejas = async (req, res) =>{
    const resp = await loadQueja();
    res.json(resp);
}



module.exports = {
    postLogin,postQueja,
    getShops, getCategories,
    getLocations, getSucursals,getQuejas,
    postComercio, postSucursal,

    deleteComercio,
    deleteSucursal,
}