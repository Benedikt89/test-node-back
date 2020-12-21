const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import todosRouter from './routes/todos';


const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

//Configure
app.disable("x-powered-by");


//-----------------------------------------
//Mongoose Settings
//-----------------------------------------
const mongoose = require("mongoose");
console.log('mongoose staff');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
//console.log(db);

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('DB-CONNECTED')
});

app.use((req, res, next) => {
  console.log('use for mongoose callback');
  if (mongoose.connection.readyState) {
    console.log('readyState');
    next();
  } else {
    console.log('else connection mongoose');
    require('./mongo')().then(() => {
      next();
    });
  }
});



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


// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT || process.argv[2] || 3000;
const host = "localhost";

let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}\n`);
});

if (require.main === module) {
  app.listen.apply(app, args);
}

// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
