// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// GET /api/users/:id - Fetch user profile
router.get('/:id', getUserProfile);

// PUT /api/users/:id - Update user profile
router.put('/:id', updateUserProfile);

module.exports = router;