// // controllers/withdrawalController.js
// const Withdrawal = require('../models/Withdrawal');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');

// exports.requestWithdrawal = async (req, res) => {
//   try {
//     const { userId, amount, method, details } = req.body;
//     const user = await User.findById(userId);

//     // 1. Validation
//     if (!user) return res.status(404).json({ message: "User not found" });
//     if (amount < 500) return res.status(400).json({ message: "Minimum withdrawal is ₹500" });
//     if (user.wallet.availableBalance < amount) {
//       return res.status(400).json({ message: "Insufficient wallet balance" });
//     }

//     // 2. Deduct from Available Balance immediately (Move to Pending)
//     user.wallet.availableBalance -= amount;
//     user.wallet.pendingBalance += amount;
//     await user.save();

//     // 3. Create Withdrawal Request
//     const request = await Withdrawal.create({
//       userId,
//       amount,
//       method,
//       details
//     });

//     // 4. Create "Debit" Transaction in history
//     await WalletTransaction.create({
//       userId,
//       amount,
//       type: 'debit',
//       source: 'withdrawal',
//       status: 'pending',
//       relatedOrderId: null
//     });

//     res.status(201).json({ message: "Withdrawal request submitted successfully", request });
//   } catch (error) {
//     res.status(500).json({ message: "Error processing withdrawal", error: error.message });
//   }
// };

// // Get all withdrawals for Admin
// exports.getAllWithdrawals = async (req, res) => {
//   try {
//     // In a real app, you'd use a middleware, but for now:
//     const adminUser = await User.findById(req.query.adminId); 
//     if (!adminUser || adminUser.role !== 'admin') {
//       return res.status(403).json({ message: "Access Denied" });
//     }

//     const withdrawals = await Withdrawal.find().populate('userId', 'name email');
//     res.json(withdrawals);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Approve/Reject Withdrawal
// exports.updateWithdrawalStatus = async (req, res) => {
//   try {
//     const { status, adminComment } = req.body;
//     const withdrawal = await Withdrawal.findById(req.params.id);
//     const user = await User.findById(withdrawal.userId);

//     if (!withdrawal) return res.status(404).json({ message: "Request not found" });

//     if (status === 'approved') {
//       user.wallet.pendingBalance -= withdrawal.amount;
//       // Money is already deducted from availableBalance during the request
//       withdrawal.status = 'approved';
//     } else if (status === 'rejected') {
//       // Return money back to Available Balance if rejected
//       user.wallet.availableBalance += withdrawal.amount;
//       user.wallet.pendingBalance -= withdrawal.amount;
//       withdrawal.status = 'rejected';
//     }

//     withdrawal.adminComment = adminComment;
//     await user.save();
//     await withdrawal.save();

//     res.json({ message: `Withdrawal ${status}` });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating status" });
//   }
// };



// controllers/withdrawalController.js
const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');
const WalletTransaction = require('../models/WalletTransaction');

exports.requestWithdrawal = async (req, res) => {
  try {
    const { userId, amount, method, details } = req.body;
    const user = await User.findById(userId);

    // 1. Validation
    if (!user) return res.status(404).json({ message: "User not found" });
    if (amount < 500) return res.status(400).json({ message: "Minimum withdrawal is ₹500" });
    if (user.wallet.availableBalance < amount) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // 2. Deduct from Available Balance immediately (Move to Pending)
    user.wallet.availableBalance -= amount;
    user.wallet.pendingBalance += amount;
    await user.save();

    // 3. Create Withdrawal Request
    const request = await Withdrawal.create({
      userId,
      amount,
      method,
      details
    });

    // 4. Create "Debit" Transaction in history
    await WalletTransaction.create({
      userId,
      amount,
      type: 'debit',
      source: 'withdrawal',
      status: 'pending',
      // 🚀 FIX 1: We link this transaction to the request ID so we can find it later!
      relatedOrderId: request._id 
    });

    res.status(201).json({ message: "Withdrawal request submitted successfully", request });
  } catch (error) {
    res.status(500).json({ message: "Error processing withdrawal", error: error.message });
  }
};

// Get all withdrawals for Admin
exports.getAllWithdrawals = async (req, res) => {
  try {
    // In a real app, you'd use a middleware, but for now:
    const adminUser = await User.findById(req.query.adminId); 
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: "Access Denied" });
    }

    const withdrawals = await Withdrawal.find().populate('userId', 'name email');
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Approve/Reject Withdrawal
exports.updateWithdrawalStatus = async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const withdrawal = await Withdrawal.findById(req.params.id);
    
    if (!withdrawal) return res.status(404).json({ message: "Request not found" });
    if (withdrawal.status !== 'pending') return res.status(400).json({ message: "Already processed" });

    const user = await User.findById(withdrawal.userId);

    if (status === 'approved') {
      user.wallet.pendingBalance -= withdrawal.amount;
      // Money is already deducted from availableBalance during the request
      withdrawal.status = 'approved';
    } else if (status === 'rejected') {
      // Return money back to Available Balance if rejected
      user.wallet.availableBalance += withdrawal.amount;
      user.wallet.pendingBalance -= withdrawal.amount;
      withdrawal.status = 'rejected';
    }

    withdrawal.adminComment = adminComment;
    await user.save();
    await withdrawal.save();

    // 🚀 FIX 2: Update the user's visible transaction history!
    await WalletTransaction.findOneAndUpdate(
      { relatedOrderId: withdrawal._id }, 
      { status: status === 'approved' ? 'completed' : 'rejected' }
    );

    res.json({ message: `Withdrawal ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};