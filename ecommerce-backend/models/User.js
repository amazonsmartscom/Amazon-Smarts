// // // models/User.js
// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   countryCode: { type: String, required: true },
// //   mobileNumber: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   role: { type: String, enum: ['user', 'admin'], default: 'user' },
// //   isVerified: { type: Boolean, default: false },
  
  
// //   // OTP Verification
// //   otp: { type: String },
// //   otpExpires: { type: Date },

// //   // Referral System
// //   myReferralCode: { type: String, unique: true, required: true }, 
// //   referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  
// //   // Wallet System
// //   wallet: {
// //     availableBalance: { type: Number, default: 0 },
// //     pendingBalance: { type: Number, default: 0 },
// //     totalEarnings: { type: Number, default: 0 }
// //   }
// // }, { timestamps: true });

// // // THIS IS THE CRITICAL LINE THAT WAS MISSING OR BROKEN:
// // module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user', 'admin'], default: 'user' },
//   myReferralCode: { type: String, unique: true },
//   referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   wallet: {
//     availableBalance: { type: Number, default: 0 },
//     pendingBalance: { type: Number, default: 0 },
//     totalEarnings: { type: Number, default: 0 },
//   },
//   // 🚀 THESE MUST BE IN YOUR FILE:
//   isVerified: { type: Boolean, default: false },
//   otp: { type: String },
//   otpExpiry: { type: Date }
// }, { timestamps: true });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  
  // Referral & Wallet
  myReferralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  wallet: {
    availableBalance: { type: Number, default: 0 },
    pendingBalance: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
  },

  // OTP & VERIFICATION FIELDS
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date }
}, { 
  timestamps: true,
  strict: true,
  autoIndex: true 
});

// 🚀 FIXED PASSWORD HASHING HOOK: Removed 'next' entirely for modern async/await
userSchema.pre('save', async function () {
  // If password is not modified, just return and let Mongoose continue
  if (!this.isModified('password')) {
    return; 
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error; // Correct way to pass errors in modern async mongoose hooks
  }
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// This tells Mongoose to ignore any old 'mobileNumber' index in the collection
const User = mongoose.model('User', userSchema);
User.syncIndexes(); 

module.exports = User;