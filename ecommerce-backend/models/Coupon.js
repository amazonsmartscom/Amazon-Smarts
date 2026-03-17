// models/Coupon.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  minPurchaseAmount: { type: Number, default: 0 },
  
  // 🚀 NEW: Array of specific products this coupon applies to. If empty, it applies to the whole cart.
  applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);