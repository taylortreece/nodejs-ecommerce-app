import express from "express";
import { verifyToken as auth } from "../middleware/verifyToken";
const router = express.Router();

router.get("/", auth, async (req, res, next) => {
   res.status(200).send("carts reached");
});

export default router;
