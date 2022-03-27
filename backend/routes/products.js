var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    res.send("Products endpoint has been hit.")
})

module.exports = router;