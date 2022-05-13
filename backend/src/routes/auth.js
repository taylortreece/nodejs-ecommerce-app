import express from "express";
import { register, login } from "../controllers/authController";
const router = express.Router();

// REGISTER
router.post("/register", (req, res, next) => {
  register(req, res, next);
});

// LOGIN
router.post("/login", (req, res, next) => {
  login(req, res, next);
});

export default router;
