const database = require("mariadb");
require('dotenv').config();

const pool = database.createPool({
    // connection details
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

module.exports = pool;