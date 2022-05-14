"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnect = exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  MONGO_URI
} = process.env;

const connect = async () => {
  try {
    await _mongoose.default.connect(MONGO_URI);
    console.log('DB Connection Successful.');
  } catch (err) {
    console.log('DB Connection Error: ', err);
  }
};

exports.connect = connect;

const disconnect = async done => {
  try {
    await _mongoose.default.diconnect(done);
    console.log('DB Disconnection Successful.');
  } catch (err) {
    console.log('DB Disonnection Error: ', err);
  }
};

exports.disconnect = disconnect;