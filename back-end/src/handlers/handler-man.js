const {verifyUser} = require('../database/db-man');

const postLogin = async (req, res) => {
    
    const {user, password} = req.body;
    const data = await verifyUser(user, password);
    const uname = data[0]["login"];
    
    if(!uname){
        res.status(401).end();
        return;
    }
    res.json({username: uname});
}

const getAlarms = async (req, res) => {

    const authHeader = req.headers['authorization'];
    const user = authHeader && authHeader.split(' ')[1]

    if(!user){
        res.status(403).end();
        return;
    }
    res.json({});
}


module.exports = {
    postLogin,
    getAlarms,
}