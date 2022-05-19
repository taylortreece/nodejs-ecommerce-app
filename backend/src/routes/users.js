import express from "express";
import { verifyToken as auth } from "../middleware/verifyToken";
const router = express.Router();

/* GET users listing. */
router.get("/", auth, async (req, res, next) => {
   res.status(200).send("users page reached");
});

router.get("/:name", auth, async (req, res, next) => {
   res.send(`hello, ${req.params.name}`);
});

export default router;
