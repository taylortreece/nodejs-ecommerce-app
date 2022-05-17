import express from "express";
import { verifyToken as auth } from "../middleware/verifyToken";
const router = express.Router();

router.post("/", auth, async (req, res, next) => {
   console.log("hit");
   return res.status(200).json({
      message: "carts has been reach",
   });
});

export default router;
