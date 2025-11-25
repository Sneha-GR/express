var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apiRouter = require('./routes/api');
const dotenv = require('dotenv');
dotenv.config();

// connect to DB (module will log connection status)
require('./database/db');

var productRouter = require('./routes/productRoutes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);
// mount product router at root — all routes in routes/productRoutes.js are used as-is
app.use('/', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Not Found'));
});

// error handler
app.use(function(err, req, res, next) {
  // provide error details in dev
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  // simple error view
  res.send(`<h1>${err.status || 500}</h1><pre>${err.message}</pre>`);
});

module.exports = app;
