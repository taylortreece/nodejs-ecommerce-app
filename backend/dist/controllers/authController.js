"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// REGISTER
const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All inputs are required");
    } // check if user already exists
    // validate if user exists in our database


    const oldUser = await _user.default.findOne({
      email
    });

    if (oldUser) {
      return res.status(409).send("User already exists. Please login.");
    } // encrypt user password


    encrypedUserPassword = await _bcrypt.default.hash(password, 10);
    const user = await _user.default.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encrypedUserPassword
    }); // create token

    const token = _jsonwebtoken.default.sign({
      user_id: user._id,
      email
    }, process.env.TOKEN_KEY, {
      expiresIn: "5h"
    });

    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    // Add morgan to register error
    console.log(err);
  }
}; // LOGIN


exports.register = register;

const login = async (req, res, next) => {
  try {
    // Get user input
    const {
      email,
      password
    } = req.body;
    console.log(email, password); // Validate user input

    if (!(email && password)) {
      res.status(400).send("All input is required");
    } // Validate if user exist in our database


    const user = await _user.default.findOne({
      email
    });
    console.log(JSON.stringify(user));

    if (user && (await _bcrypt.default.compare(password, user.password))) {
      //Create token
      console.log("Token_KEY", process.env.TOKEN_KEY);

      const token = _jsonwebtoken.default.sign({
        user_id: user._id,
        email
      }, process.env.TOKEN_KEY, {
        expiresIn: "24h"
      });

      console.log(JSON.stringify(token)); // Save user token

      user.token = token;
      return res.status(200).json(user);
    }

    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    res.status(400).send("error");
  }
};

exports.login = login;