const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'db_assessment',
};

const pool = mysql.createPool(config);

module.exports = pool;
