const {Pool} = require('pg');
const conPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function verifyUser(name, pass){
    const client = await conPool.connect();
    const data = await client.query('select * from login($1, $2)', [name, pass]);
    client.release();
    return data.rows;
}


module.exports = {
    verifyUser
}