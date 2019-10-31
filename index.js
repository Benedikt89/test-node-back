const express = require('express');
const users = require('./users-router');
const cors = require('cors');
const bodyParser = require('body-parser');

//created expressApp
const app = express();


//


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Hello World');
});

app.use('/users', users);

app.get('/tasks', (req, res)=>{
    res.send('tasks');
});

//middleware
app.use((req, res)=>{
    res.send(404)
});





app.listen(7575, () => {
    console.log('App listening port 7575')
});









