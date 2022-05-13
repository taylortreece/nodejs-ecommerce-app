"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accessLogStream = _fs.default.createWriteStream(_path.default.join(__dirname, "../../logs/access.log"), {
  flags: "a"
});

const logger = (0, _morgan.default)("combined", {
  stream: accessLogStream
});
exports.logger = logger;