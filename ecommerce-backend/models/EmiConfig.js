// backend/models/EmiConfig.js
const mongoose = require('mongoose');

const emiConfigSchema = new mongoose.Schema({
  // Global Defaults
  global: {
    interestRateMonthly: { type: Number, default: 2 }, // 2% per month
    minDownPaymentPercent: { type: Number, default: 10 }, // 10% minimum
    allowedTenures: { type: [Number], default: [3, 6, 9, 12] }
  },
  // Category-Specific Overrides
  categories: [{
    categoryName: { type: String, required: true },
    interestRateMonthly: { type: Number },
    minDownPaymentPercent: { type: Number },
    allowedTenures: { type: [Number] }
  }]
});

module.exports = mongoose.model('EmiConfig', emiConfigSchema);