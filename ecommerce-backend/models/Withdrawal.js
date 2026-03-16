// // models/Withdrawal.js
// const mongoose = require('mongoose');

// const withdrawalSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   amount: { type: Number, required: true },
//   method: { type: String, enum: ['UPI', 'Bank Transfer'], required: true },
//   details: {
//     upiId: { type: String },
//     bankName: { type: String },
//     accountNumber: { type: String },
//     ifscCode: { type: String },
//   },
//   status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
//   adminComment: { type: String },
//   proofImage: { type: String }, // URL of the screenshot uploaded by Admin after transfer
// }, { timestamps: true });

// module.exports = mongoose.model('Withdrawal', withdrawalSchema);

// models/Withdrawal.js
const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  
  // 🚀 FIXED: Changed 'Bank Transfer' to 'BANK' to match the frontend exactly
  method: { type: String, enum: ['UPI', 'BANK'], required: true },
  
  details: {
    upiId: { type: String },
    accountName: { type: String },  // 🚀 ADDED: Frontend sends this
    bankName: { type: String },
    accountNumber: { type: String },
    ifsc: { type: String },         // 🚀 FIXED: Matched frontend's 'ifsc' key
  },
  
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminComment: { type: String },
  proofImage: { type: String }, // URL of the screenshot uploaded by Admin after transfer
}, { timestamps: true });

module.exports = mongoose.model('Withdrawal', withdrawalSchema);