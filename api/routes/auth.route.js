import express from 'express';

//controller
import { signup, signInController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signInController);

export default router;