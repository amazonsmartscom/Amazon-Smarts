// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();

// // 🚀 FIX: Matched the exact capitalization of verifyOTP from your controller
// const { registerUser, verifyOTP, loginUser } = require('../controllers/authController');

// router.post('/register', registerUser);
// router.post('/verify-otp', verifyOTP); // 🚀 Updated here too
// router.post('/login', loginUser);

// module.exports = router;


// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();

// const { registerUser, verifyOTP, loginUser, sendOtpOnly } = require('../controllers/authController');

// router.post('/register', registerUser);
// router.post('/verify-otp', verifyOTP); 
// router.post('/login', loginUser);

// // 🚀 NEW: Route for Checkout OTP Verification
// router.post('/send-otp', sendOtpOnly);

// module.exports = router;



// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const { 
  registerUser, 
  verifyOTP, 
  loginUser, 
  sendOtpOnly,
  sendForgotPasswordOtp, 
  resetPassword 
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP); 
router.post('/login', loginUser);

// Route for Checkout OTP Verification
router.post('/send-otp', sendOtpOnly);

// 🚀 NEW: Forgot Password Routes
router.post('/forgot-password-otp', sendForgotPasswordOtp);
router.post('/reset-password', resetPassword);

module.exports = router;