import express from "express";
import cors from "cors";
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from "mongoose";

import indexRouter from './routes/index';
import todosRouter from './routes/todos';

mongoose.connect('mongodb://localhost/todolist', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('DB-CONNECTED')
});

var app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

//Configure
app.disable("x-powered-by");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
app.use('/', indexRouter);
app.use('/todos', todosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.APP_PORT || 8001;
console.log(port);

app.listen(port, function(){
  console.log("App listening port: " + port);
});
//
module.exports = app;
