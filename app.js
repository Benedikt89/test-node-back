import express from "express";
const app = express();

// ----------------------------------------
// ENV
// ----------------------------------------
if (process.env.NODE_ENV !== "development") {
  console.log('mode = ' + process.env.NODE_ENV);
  require("dotenv").config();
}

import cors from "cors";
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


// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT || process.argv[2] || 8001;
const host = process.env.HOST || "localhost";

let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}\n`);
});

if (require.main === module) {
  app.listen.apply(app, args);
}


//-----------------------------------------
//Mongoose Settings
//-----------------------------------------
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
console.log('mongoose staff');
var db;

var mongoUrl = process.env.MONGODB_URI || process.env.DATA_BASE_URL || `mongodb://localhost/todolist`;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(mongoUrl);
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function () {
    console.log('DB-CONNECTED')
  });

  const server = app.listen(process.env.PORT || 8001, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

// ----------------------------------------
// engine setup
// ----------------------------------------

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

// ----------------------------------------
// Error Handling
// ----------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});