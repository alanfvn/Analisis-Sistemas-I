require('dotenv').config()
const {postLogin} = require('./handlers/handler-man.js');
const express = require('express');
const cors = require('cors');
const app = express();

app.listen(3001, () => console.log('Running on port 3001'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//endpoints.
app.post('/api/login', postLogin);