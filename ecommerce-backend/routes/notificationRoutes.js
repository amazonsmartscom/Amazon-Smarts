// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { getUserNotifications, markAsRead, deleteNotification } = require('../controllers/notificationController');

// Routes match the frontend axios calls
router.get('/:userId', getUserNotifications);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

module.exports = router;