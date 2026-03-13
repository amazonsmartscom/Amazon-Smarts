const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Please upload a banner image"]
  },
  title: {
    type: String,
    required: [true, "Please enter a banner title"],
    trim: true
  },
  subtitle: {
    type: String,
    required: [true, "Please enter a banner subtitle"]
  },
  link: {
    type: String,
    default: "/"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Banner', bannerSchema);