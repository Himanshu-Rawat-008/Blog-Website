import express from 'express';

//controller
import signup from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

export default router;