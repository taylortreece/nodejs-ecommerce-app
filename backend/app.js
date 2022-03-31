require('dotenv').config();
require("./config/database").connect();
var fs = require('fs')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.js')
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
var cartsRouter = require('./routes/carts')

const User = require("./models/user")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// create log stream && log content
// https://github.com/expressjs/morgan#use-custom-token-formats
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, './logs/access.log'), 
  { flags: 'a' }
  )

app.use(logger('combined', { stream: accessLogStream }));

// Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter)

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

module.exports = app;
