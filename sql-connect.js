const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123qweasd'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

const client = mysql.createClient();
client.host='127.0.0.1';
client.port= '3306';
client.user='root';
client.password='123qweasd';
client.database='tasks';



client.query(query, [params, callback]);

client.query('SELECT * FROM users', function(error, result, fields){
    console.log(result);
});

client.end();


var query = connection.query('INSERT INTO users SET ?', user, function(err, result) {
    console.log(err);
    console.log(result);
});
