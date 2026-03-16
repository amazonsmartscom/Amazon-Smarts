// const express = require('express');
// const router = express.Router();
// const Banner = require('../models/Banner');
// const multer = require('multer');
// const path = require('path');

// // --- MULTER CONFIG (Storage logic) ---
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Ensure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, `banner-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });
// const upload = multer({ storage });

// // 🚀 1. GET ALL BANNERS (Public)
// router.get('/', async (req, res) => {
//   try {
//     const banners = await Banner.find().sort({ createdAt: -1 });
//     res.status(200).json(banners);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 🚀 2. UPLOAD NEW BANNER (Admin Only)
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const { adminId, title, subtitle, link } = req.body;

//     // Optional: Basic Admin Check (Better to use middleware if you have one)
//     if (!adminId) return res.status(403).json({ message: "Access Denied" });

//     const newBanner = new Banner({
//       image: req.file ? req.file.path : '',
//       title,
//       subtitle,
//       link
//     });

//     await newBanner.save();
//     res.status(201).json(newBanner);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 🚀 3. DELETE BANNER (Admin Only)
// router.delete('/:id', async (req, res) => {
//   try {
//     const { adminId } = req.query;
//     if (!adminId) return res.status(403).json({ message: "Access Denied" });

//     const banner = await Banner.findById(req.params.id);
//     if (!banner) return res.status(404).json({ message: "Banner not found" });

//     await banner.deleteOne();
//     res.status(200).json({ message: "Banner deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


// routes/bannerRoutes.js
const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 🚀 CLOUDINARY CONFIGURATION
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'amazon-smarts-banners', // Stores banners in a separate Cloudinary folder
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const upload = multer({ storage: storage });

// 🚀 1. GET ALL BANNERS (Public)
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🚀 2. UPLOAD NEW BANNER (Admin Only)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { adminId, title, subtitle, link } = req.body;

    // Optional: Basic Admin Check (Better to use middleware if you have one)
    if (!adminId) return res.status(403).json({ message: "Access Denied" });

    const newBanner = new Banner({
      // req.file.path now contains the secure Cloudinary URL (https://...)
      image: req.file ? req.file.path : '',
      title,
      subtitle,
      link
    });

    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🚀 3. DELETE BANNER (Admin Only)
router.delete('/:id', async (req, res) => {
  try {
    const { adminId } = req.query;
    if (!adminId) return res.status(403).json({ message: "Access Denied" });

    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    await banner.deleteOne();
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;