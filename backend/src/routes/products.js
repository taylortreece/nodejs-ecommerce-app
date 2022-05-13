import express from "express";
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send("Products endpoint has been hit.");
});

export default router;
