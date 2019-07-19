const mysql = require('mysql');

const config = {
    host: 'us-cdbr-iron-east-02.cleardb.net' || 'localhost',
    user: 'be9e78d2c4d29a' || 'root',
    password: 'a5143c78' || '12345',
    database: 'heroku_7a8487ebde199ee' || 'db_assessment',
};

const pool = mysql.createPool(config);

module.exports = pool;