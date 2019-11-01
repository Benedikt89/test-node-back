const mysql = require('mysql');

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123qweasd'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
//
// const client = mysql.createClient();
// client.host='127.0.0.1';
// client.port= '3306';
// client.user='root';
// client.password='123qweasd';
// client.database='tasks';


