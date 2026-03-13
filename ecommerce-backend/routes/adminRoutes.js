const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');

// 🚀 SECURE ANALYTICS ROUTE
router.get('/stats', isAdmin, getDashboardStats);

module.exports = router;