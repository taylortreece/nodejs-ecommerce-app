"use strict";

var express = require('express');

var router = express.Router();

const auth = require("../middleware/verifyToken");
/* GET users listing. */


router.get('/', auth, async function (req, res, next) {
  res.send('Users endpoint has been reached.');
});
router.get('/:name', auth, async (req, res, next) => {
  res.send(`hello, ${req.params.name}`);
});
module.exports = router;