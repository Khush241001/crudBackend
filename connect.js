const {Client} = require('pg');

const client = new Client({
    host : "localhost",
    user : "user1",
    port : 5432,
    password : "admin",
    database : "recipebook"
})

module.exports = client;