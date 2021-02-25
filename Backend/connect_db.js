const mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '220699',
    database: process.env.DB_NAME || 'hrm',
    port: process.env.DB_PORT || '3306'
})

module.exports = db;