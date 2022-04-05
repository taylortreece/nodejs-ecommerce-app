var express = require('express');
var router = express.Router();
const auth = require("../src/middleware/verifyToken");

router.get('/', auth, async (req, res, next) => {
    res.send("Products endpoint has been hit.")
})

module.exports = router;