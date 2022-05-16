// DB SETUP
import "dotenv/config";
// import { connect } from "./config/database";
// connect();

// REQUIREMENTS
import cors from "cors";
import { corsOptions } from "./config/cors";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { logger } from "./config/morgan";

// ROUTES
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import productsRouter from "./routes/products";
import ordersRouter from "./routes/orders";
import cartsRouter from "./routes/carts";

// MODELS
import User from "./models/user";

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

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
   res.status(err.status || 500).json({
      status: err.status,
      message: err.message,
      error: err,
   });
});

module.exports = app;
