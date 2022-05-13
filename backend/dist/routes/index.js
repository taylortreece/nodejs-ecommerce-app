"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // const auth = require("../middleware/verifyToken")

/* GET home page. */


router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to the home page.");
});
var _default = router;
exports.default = _default;