import express from 'express';

//controller
import { signup, signInController, googleController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signInController);
router.post('/google', googleController);

export default router;