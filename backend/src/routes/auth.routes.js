import express from 'express';

import{
  sendOtp,
  registerUser,
  loginUser,
  verifyOTP
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);

export default router;