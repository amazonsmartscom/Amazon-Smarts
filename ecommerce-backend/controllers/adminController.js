// controllers/adminController.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Total Sales Revenue (Sum of all paid orders)
    const salesData = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" }, count: { $sum: 1 } } }
    ]);

    // 2. Top 5 Best Selling Products (by quantity sold)
    const topProducts = await Order.aggregate([
      { $match: { isPaid: true } },
      { $unwind: "$orderItems" },
      { $group: { 
          _id: "$orderItems.product", 
          name: { $first: "$orderItems.name" },
          totalSold: { $sum: "$orderItems.quantity" },
          revenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } }
        } 
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    // 3. User Growth
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      revenue: salesData[0]?.totalRevenue || 0,
      orderCount: salesData[0]?.count || 0,
      userCount: totalUsers,
      productCount: totalProducts,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: "Analytics failed", error: error.message });
  }
};