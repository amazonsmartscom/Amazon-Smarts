// // routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();

// // 🚀 ADDED getUserOrders to your imports
// const { createOrder, simulatePayment, getUserOrders } = require('../controllers/orderController');

// router.post('/', createOrder);
// router.put('/:id/pay', simulatePayment);

// // 🚀 ADDED this new route for the My Orders page
// router.get('/myorders/:userId', getUserOrders);

// module.exports = router;

// routes/orderRoutes.js
const express = require('express');
const router = express.Router();

const { 
  createOrder, 
  simulatePayment, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');

// User Routes
router.post('/', createOrder);
router.put('/:id/pay', simulatePayment);
router.get('/user/:userId', getUserOrders); // 🚀 Matches frontend fetch URL

// Admin Routes
router.get('/admin/all', getAllOrders);
router.put('/admin/:id/status', updateOrderStatus);

module.exports = router;