import express from "express";
import { verifyToken as auth } from "../middleware/verifyToken";
import { displayProfileInfo } from "../controllers/usersController";
const router = express.Router();

/* GET users listing. */
router.get("/", auth, async (req, res, next) => {
   return await displayProfileInfo(req, res, next);
});

router.get("/:name", auth, async (req, res, next) => {
   res.send(`hello, ${req.params.name}`);
});

export default router;
