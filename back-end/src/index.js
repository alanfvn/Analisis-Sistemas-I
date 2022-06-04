require('dotenv').config()
const {postLogin, getShops, getCategories, getLocations, getSucursals, getQuejas, postQueja, postComercio, postSucursal, deleteSucursal, deleteComercio} = require('./handlers/handler-man.js');
const express = require('express');
const cors = require('cors');
const app = express();

app.listen(3001, () => console.log('Running on port 3001'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//endpoints.
app.post('/api/login', postLogin);
app.post('/api/post_queja', postQueja);
app.post('/api/post_comercio', postComercio);
app.post('/api/post_sucursal', postSucursal)
//get
app.get('/api/get_shops', getShops);
app.get('/api/get_categories', getCategories);
app.get('/api/get_locations', getLocations);
app.get('/api/get_sucursals', getSucursals);
app.post('/api/post_quejas', getQuejas);

//delete
app.delete('/api/delete_sucursal', deleteSucursal);
app.delete('/api/delete_comercio', deleteComercio);