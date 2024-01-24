const mysql = require('mysql2');

const mysqlpool = mysql.createPool({
    host: 'mysql-2d496ca6-webproject.a.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_gDaDy-t1Z9SZAt-yhlJ',
    database: 'defaultdb',
    port: '14618'
});

const promisePool = mysqlpool.promise();


module.exports = promisePool;