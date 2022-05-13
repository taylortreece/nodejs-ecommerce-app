import express from "express";
import { verifyToken as auth } from "../middleware/verifyToken";
const router = express.Router();

/* GET users listing. */
router.get("/", auth, async function (req, res, next) {
  res.send("Users endpoint has been reached.");
});

router.get("/:name", auth, async (req, res, next) => {
  res.send(`hello, ${req.params.name}`);
});

export default router;
