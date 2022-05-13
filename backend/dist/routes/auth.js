"use strict";

const express = require("express");

const router = express.Router();

const auth = require("../controllers/authController"); // REGISTER


router.post("/register", (req, res, next) => {
  auth.register(req, res, next);
}); // LOGIN

router.post("/login", (req, res, next) => {
  auth.login(req, res, next);
});
module.exports = router;