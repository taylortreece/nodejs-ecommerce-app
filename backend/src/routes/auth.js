import express from "express";
import { register, login } from "../controllers/authController";
const router = express.Router();

// REGISTER
router.get("/register", (req, res, next) => {
   res.send("you've reached the page to register a new user.");
});

router.post("/register", (req, res, next) => {
   console.log("ROUTE HIT");
   register(req, res, next);
});

// LOGIN
router.get("/login", (req, res, next) => {
   res.send("you've reached the page to login a user.");
});

router.post("/login", (req, res, next) => {
   login(req, res, next);
});

export default router;
