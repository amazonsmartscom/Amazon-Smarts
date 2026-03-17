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
  resetPassword,
  resendOtp,
  getSettings,      // 🚀 NEW
  updateSettings    // 🚀 NEW
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP); 
router.post('/login', loginUser);
router.post('/send-otp', sendOtpOnly);
router.post('/forgot-password-otp', sendForgotPasswordOtp);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOtp);

// 🚀 NEW: Global Settings Routes for Admin Signup Bonus
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

module.exports = router;