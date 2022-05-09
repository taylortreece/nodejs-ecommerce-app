require("dotenv").config();
require("./src/config/database").connect();
const cors = require("cors");
const { corsOptions } = require("./src/config/cors");
var fs = require("fs");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("./src/config/morgan");

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
var authRouter = require("./src/routes/auth.js");
var productsRouter = require("./src/routes/products");
var ordersRouter = require("./src/routes/orders");
var cartsRouter = require("./src/routes/carts");

const User = require("./src/models/user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Configuration
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(logger); // logs: https://github.com/expressjs/morgan#use-custom-token-formats
app.use(cors(corsOptions));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/carts", cartsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
