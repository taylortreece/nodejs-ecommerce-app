"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _verifyToken = require("../middleware/verifyToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { SenderFromJSON } from 'mailslurp-client';
const router = _express.default.Router();

router.get('/', _verifyToken.verifyToken, async (req, res, next) => {
  res.send('Orders endpoint has been hit.');
});
var _default = router;
exports.default = _default;