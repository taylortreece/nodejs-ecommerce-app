var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users endpoint has been reached.');
});

router.get('/:name', async (req, res, next) => {
  res.send(`hello, ${req.params.name}`)
})

module.exports = router;
