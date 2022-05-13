"use strict";

require("dotenv/config");

var _database = require("./config/database");

var _cors = _interopRequireDefault(require("cors"));

var _cors2 = require("./config/cors");

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("./config/morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _products = _interopRequireDefault(require("./routes/products"));

var _orders = _interopRequireDefault(require("./routes/orders"));

var _carts = _interopRequireDefault(require("./routes/carts"));

var _user = _interopRequireDefault(require("./models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DB SETUP
(0, _database.connect)(); // REQUIREMENTS

const app = (0, _express.default)(); // view engine setup

app.set("views", _path.default.join(__dirname, "views"));
app.set("view engine", "jade"); // Configuration

app.use(_express.default.json({
  limit: "50mb"
}));
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, "public")));
app.use(_morgan.default); // logs: https://github.com/expressjs/morgan#use-custom-token-formats

app.use((0, _cors.default)(_cors2.corsOptions)); // Routes

app.use("/", _index.default);
app.use("/users", _users.default);
app.use("/auth", _auth.default);
app.use("/products", _products.default);
app.use("/orders", _orders.default);
app.use("/carts", _carts.default); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;