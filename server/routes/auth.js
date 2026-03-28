const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP, loginOtp, register } = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/login-otp', loginOtp);
router.post('/register', register);
router.get("/me", authMiddleware, userController.getMe);

module.exports = router;