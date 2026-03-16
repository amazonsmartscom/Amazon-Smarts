// controllers/notificationController.js
const Notification = require('../models/Notification');

// 1. Fetch all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// 2. Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.status(200).json(notif);
  } catch (error) {
    res.status(500).json({ message: 'Error marking as read' });
  }
};

// 3. Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification' });
  }
};

// 🚀 INTERNAL HELPER: Call this function from anywhere in your backend to send an alert!
exports.createNotification = async (userId, title, message, type = 'info', link = null) => {
  try {
    if (!userId) return;
    await Notification.create({ userId, title, message, type, link });
  } catch (error) {
    console.error("Failed to create notification system alert:", error);
  }
};