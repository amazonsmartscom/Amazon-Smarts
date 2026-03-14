// models/Banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Please upload a banner image"]
  },
  title: {
    type: String,
    trim: true,
    default: "" // 🚀 FIXED: No longer required
  },
  subtitle: {
    type: String,
    default: "" // 🚀 FIXED: No longer required
  },
  link: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Banner', bannerSchema);