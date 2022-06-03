const {Pool} = require('pg');
const conPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function verifyUser(name, pass){
    const client = await conPool.connect();
    const data = await client.query('select * from iniciar_sesion($1, $2)', [name, pass]);
    client.release();
    return data.rows;
}

async function loadShops(){
    const client = await conPool.connect();
    const data = await client.query('select * from lista_comercios');
    client.release();
    return data.rows;
}

async function loadSucursal(){
    const client = await conPool.connect();
    const data = await client.query('select * from lista_sucursales');
    client.release();
    return data.rows;
}

async function loadCategories(){
    const client = await conPool.connect();
    const data = await client.query('select * from tb_categoria_queja');
    client.release();
    return data.rows;
}

async function loadLocations(){
    const client = await conPool.connect();
    const data = await client.query('select * from lista_locaciones');
    client.release();
    return data.rows;
}

async function loadQueja(){
    const client = await conPool.connect();
    const data = await client.query('select * from lista_quejas');
    client.release();
    return data.rows;
}

/////
async function insertQueja(id_sucu, categ, queja){
    const client = await conPool.connect();
    const data = await client.query('call ingresar_queja($1, $2, $3, $4, $5)', [
        id_sucu,
        categ,
        queja,
        -1,
        ""
    ]);
    client.release();
    return data.rows;
}

async function insertarComercio(id, comercio, propietarios){
    const client = await conPool.connect();
    const data = await client.query('call ingresar_comercio($1, $2, $3, $4)', [
        id,
        comercio,
        propietarios,
        ""
    ]);
    client.release();
    return data.rows;
}

async function insertarSucursal(id, id_comer, id_muni, sucursal){
    const client = await conPool.connect();
    const data = await client.query('call ingresar_sucursal($1, $2, $3, $4, $5)', [
        id,
        id_comer,
        id_muni,
        sucursal,
        ""
    ]);
    client.release();
    return data.rows;
}


//borrar
async function borrarComercio(id){
    const client = await conPool.connect();
    const data = await client.query('delete from tb_comercio where id_comercio = $1', [
        id,
    ]);
    client.release();
    return data.rows;
}

async function borrarSucursal(id){
    const client = await conPool.connect();
    const data = await client.query('delete from tb_sucursal where id_sucursal = $1', [
        id,
    ]);
    client.release();
    return data.rows;
}

module.exports = {
    verifyUser, 
    loadShops, loadCategories,loadLocations, loadSucursal, loadQueja,
    insertQueja, insertarComercio, insertarSucursal,

    borrarComercio, borrarSucursal
}