var express = require("express");
var router = express.Router();

router.get('/login', async (req, res, next) => {
    res.send("Login endpoint has been hit.")
})

router.get('/register', async (req, res, next) => {
    res.send("Register endpoint has been hit.")
})

module.exports = router;