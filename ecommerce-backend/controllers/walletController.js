// controllers/walletController.js
const User = require('../models/User');
const WalletTransaction = require('../models/WalletTransaction');

exports.getWalletDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch all transactions for this user, newest first
    const transactions = await WalletTransaction.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      wallet: user.wallet,
      transactions
    });
  } catch (error) {
    console.error("Wallet Fetch Error:", error);
    res.status(500).json({ message: 'Server error fetching wallet' });
  }
};