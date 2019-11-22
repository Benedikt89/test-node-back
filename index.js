const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const users = require('./src/routers/users-router');
const products = require('./src/routers/products-router');

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/pizzas', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
});

//created expressApp
const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Hello World');
});

app.use('/users', users);
app.use('/pizzas', products);

//middleware
app.use((req, res, next)=>{
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});


app.listen(8000, () => {
    console.log('App listening port 8000')
});









