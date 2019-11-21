const express = require('express');
const users = require('./users-router');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/back-test', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
});

//created expressApp
const app = express();

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
    res.sendStatus(404)
});



app.listen(7575, () => {
    console.log('App listening port 7575')
});









