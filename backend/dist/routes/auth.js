"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = require("../controllers/authController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // REGISTER


router.post("/register", (req, res, next) => {
  (0, _authController.register)(req, res, next);
}); // LOGIN

router.post("/login", (req, res, next) => {
  (0, _authController.login)(req, res, next);
});
var _default = router;
exports.default = _default;