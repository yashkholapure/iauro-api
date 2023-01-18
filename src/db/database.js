const mysql=require('mysql2');
module.exports=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rohit@11',
    database: 'iauro'
});