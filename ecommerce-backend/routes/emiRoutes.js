// backend/routes/emiRoutes.js
const express = require('express');
const router = express.Router();

const { 
  calculateEmi, 
  forecloseLoan, 
  getCartEmiConfig, 
  getAdminConfig, 
  updateAdminConfig,
  verifyPanCard,
  sendAadhaarOtp,
  verifyAadhaarOtp
} = require('../controllers/emiController');

// 🚀 DYNAMIC HIERARCHY ROUTES
router.post('/cart-config', getCartEmiConfig); 
router.post('/calculate', calculateEmi);       
router.get('/admin/config', getAdminConfig);
router.put('/admin/config', updateAdminConfig);

// 🚀 API-BASED KYC ROUTES
router.post('/kyc/pan', verifyPanCard);
router.post('/kyc/aadhaar/send-otp', sendAadhaarOtp);
router.post('/kyc/aadhaar/verify-otp', verifyAadhaarOtp);

// 🚀 ADMIN CONTROLS
router.put('/admin/:id/foreclose', forecloseLoan);

module.exports = router;