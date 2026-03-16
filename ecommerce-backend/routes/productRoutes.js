// // routes/productRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// // const { getProducts, createProduct, getProductById } = require('../controllers/productController'); // 🚀 IMPORT ADDED HERE
// const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
// // Set up Multer to save files to the 'uploads' folder
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     // Add a timestamp so files with the same name don't overwrite each other
//     cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
//   }
// });
// const upload = multer({ storage: storage });

// router.get('/', getProducts);
// router.get('/:id', getProductById); // 🚀 NEW ROUTE ADDED HERE FOR SINGLE PRODUCT

// // We tell multer to look for 'images' and 'banners' files coming from the PC
// router.post('/', upload.fields([
//   { name: 'images', maxCount: 5 }, 
//   { name: 'banners', maxCount: 2 }
// ]), createProduct);

// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

// module.exports = router;

// // routes/productRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { 
//     getProducts, 
//     createProduct, 
//     getProductById, 
//     updateProduct, 
//     deleteProduct 
// } = require('../controllers/productController'); 
// const { isAdmin } = require('../middleware/authMiddleware'); // 🚀 IMPORT SECURITY MIDDLEWARE

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
//   }
// });
// const upload = multer({ storage: storage });

// // PUBLIC ROUTES (Anyone can view products)
// router.get('/', getProducts);
// router.get('/:id', getProductById); 

// // 🚀 SECURE ADMIN ROUTES (Only Admins can modify the store)
// // We pass isAdmin before the controller to check for permissions

// // CREATE
// router.post('/', 
//     isAdmin, 
//     upload.fields([
//       { name: 'images', maxCount: 5 }, 
//       { name: 'banners', maxCount: 2 }
//     ]), 
//     createProduct
// );

// // UPDATE
// router.put('/:id', 
//     isAdmin, 
//     upload.fields([
//       { name: 'images', maxCount: 5 }, 
//       { name: 'banners', maxCount: 2 }
//     ]), 
//     updateProduct
// );

// // DELETE
// router.delete('/:id', isAdmin, deleteProduct);

// module.exports = router;


// // routes/productRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { 
//     getProducts, 
//     createProduct, 
//     getProductById, 
//     updateProduct, 
//     deleteProduct,
//     createProductReview, // 🚀 NEW
//     getPendingReviews, // 🚀 NEW
//     updateReviewStatus // 🚀 NEW
// } = require('../controllers/productController'); 
// const { isAdmin } = require('../middleware/authMiddleware');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
//   }
// });
// const upload = multer({ storage: storage });

// // Public Routes
// router.get('/', getProducts);
// router.get('/:id', getProductById); 
// router.post('/:id/reviews', createProductReview); // 🚀 POST REVIEW

// // Admin Secure Routes
// router.get('/admin/pending-reviews', isAdmin, getPendingReviews); // 🚀 FETCH PENDING REVIEWS
// router.put('/admin/reviews/status', isAdmin, updateReviewStatus); // 🚀 APPROVE/REJECT REVIEWS

// router.post('/', isAdmin, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'banners', maxCount: 2 }]), createProduct);
// router.put('/:id', isAdmin, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'banners', maxCount: 2 }]), updateProduct);
// router.delete('/:id', isAdmin, deleteProduct);

// module.exports = router;


// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { 
    getProducts, 
    createProduct, 
    getProductById, 
    updateProduct, 
    deleteProduct,
    createProductReview, 
    getPendingReviews, 
    updateReviewStatus 
} = require('../controllers/productController'); 
const { isAdmin } = require('../middleware/authMiddleware');

// 🚀 CLOUDINARY CONFIGURATION
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'amazon-smarts-products', // Stores product images in this Cloudinary folder
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const upload = multer({ storage: storage });

// Public Routes
router.get('/', getProducts);
router.get('/:id', getProductById); 
router.post('/:id/reviews', createProductReview); // 🚀 POST REVIEW

// Admin Secure Routes
router.get('/admin/pending-reviews', isAdmin, getPendingReviews); // 🚀 FETCH PENDING REVIEWS
router.put('/admin/reviews/status', isAdmin, updateReviewStatus); // 🚀 APPROVE/REJECT REVIEWS

router.post('/', isAdmin, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'banners', maxCount: 2 }]), createProduct);
router.put('/:id', isAdmin, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'banners', maxCount: 2 }]), updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

module.exports = router;