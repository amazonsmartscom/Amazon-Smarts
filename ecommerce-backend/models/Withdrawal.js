// models/Withdrawal.js
const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['UPI', 'Bank Transfer'], required: true },
  details: {
    upiId: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminComment: { type: String },
  proofImage: { type: String }, // URL of the screenshot uploaded by Admin after transfer
}, { timestamps: true });

module.exports = mongoose.model('Withdrawal', withdrawalSchema);