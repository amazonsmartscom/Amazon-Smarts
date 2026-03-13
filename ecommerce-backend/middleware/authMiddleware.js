// middleware/authMiddleware.js
const User = require('../models/User');

exports.isAdmin = async (req, res, next) => {
  try {
    // We check for adminId in the query string (passed from our frontend axios calls)
    const { adminId } = req.query;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorised: No Admin ID provided" });
    }

    const user = await User.findById(adminId);

    if (user && user.role === 'admin') {
      next(); // Success! Move to the next function (the controller)
    } else {
      res.status(403).json({ message: "Access Denied: Admins Only" });
    }
  } catch (error) {
    res.status(500).json({ message: "Security check failed", error: error.message });
  }
};