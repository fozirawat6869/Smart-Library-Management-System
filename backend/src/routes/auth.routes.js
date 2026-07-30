import express from 'express';
import { loginLimiter } from '../middlewares/rateLimiter.js';

import{
  registerUser,
  loginUser,
  verifyOtpController,
  sendOtpController
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/send-otp', sendOtpController);
router.post('/register', registerUser);
router.post('/login', loginLimiter, loginUser);
router.post('/verify-otp', verifyOtpController);

export default router;