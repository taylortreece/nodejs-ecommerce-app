import express from "express";
const router = express.Router();
// const auth = require("../middleware/verifyToken")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to the home page.");
});

export default router;
