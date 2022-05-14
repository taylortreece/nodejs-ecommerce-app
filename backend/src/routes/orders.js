// import { SenderFromJSON } from 'mailslurp-client';
import express from 'express';
import { verifyToken as auth } from '../middleware/verifyToken';
const router = express.Router();

router.get('/', auth, async (req, res, next) => {
   res.send('Orders endpoint has been hit.');
});

export default router;
