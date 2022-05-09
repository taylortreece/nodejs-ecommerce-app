var express = require("express");
var router = express.Router();
const auth = require("../middleware/verifyToken");

router.get("/", auth, async (req, res, next) => {
  res.send("Carts endpoint has been hit.");
});

module.exports = router;
