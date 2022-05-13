"use strict";

var express = require('express');

var router = express.Router(); // const auth = require("../middleware/verifyToken")

/* GET home page. */

router.get('/', function (req, res, next) {
  res.status(200).send("Welcome to the home page.");
});
module.exports = router;