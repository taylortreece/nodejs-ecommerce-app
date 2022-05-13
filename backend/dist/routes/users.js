"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyToken = require("../middleware/verifyToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();
/* GET users listing. */


router.get("/", _verifyToken.verifyToken, async function (req, res, next) {
  res.send("Users endpoint has been reached.");
});
router.get("/:name", _verifyToken.verifyToken, async (req, res, next) => {
  res.send(`hello, ${req.params.name}`);
});
var _default = router;
exports.default = _default;