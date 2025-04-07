
import express from 'express';

// controller
import { test, updateUserController } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUserController);

export default router;