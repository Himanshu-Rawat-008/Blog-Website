
import express from 'express';

// controller
import controller from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', controller);

export default router;