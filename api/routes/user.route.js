
import express from 'express';

// controller
import { deleteUserController, test, updateUserController } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUserController);
router.delete('/delete/:userId', verifyToken, deleteUserController)

export default router;