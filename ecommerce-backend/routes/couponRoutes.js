// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const { 
  validateCoupon, 
  getAllCoupons, 
  createCoupon, 
  toggleCouponStatus, 
  deleteCoupon 
} = require('../controllers/couponController');

// Public Route
router.post('/validate', validateCoupon);

// Admin Routes (In a real app, you would add an admin auth middleware here)
router.get('/', getAllCoupons);
router.post('/', createCoupon);
router.patch('/:id/toggle', toggleCouponStatus);
router.delete('/:id', deleteCoupon);

module.exports = router;