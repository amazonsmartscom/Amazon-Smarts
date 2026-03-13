// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// 🚀 FIX: Matched the exact capitalization of verifyOTP from your controller
const { registerUser, verifyOTP, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP); // 🚀 Updated here too
router.post('/login', loginUser);

module.exports = router;