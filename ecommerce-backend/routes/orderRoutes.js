// // routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();

// // 🚀 ADDED getUserOrders to your imports
// const { createOrder, simulatePayment, getUserOrders } = require('../controllers/orderController');

// router.post('/', createOrder);
// router.put('/:id/pay', simulatePayment);

// // 🚀 ADDED this new route for the My Orders page
// router.get('/myorders/:userId', getUserOrders);

// module.exports = router;

// routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();

// const { 
//   createOrder, 
//   simulatePayment, 
//   getUserOrders, 
//   getAllOrders, 
//   updateOrderStatus 
// } = require('../controllers/orderController');

// // User Routes
// router.post('/', createOrder);
// router.put('/:id/pay', simulatePayment);
// router.get('/user/:userId', getUserOrders); // 🚀 Matches frontend fetch URL

// // Admin Routes
// router.get('/admin/all', getAllOrders);
// router.put('/admin/:id/status', updateOrderStatus);


// module.exports = router;


// // routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();

// const { 
//   createOrder, 
//   simulatePayment, 
//   getUserOrders, 
//   getAllOrders, 
//   updateOrderStatus,
//   cancelOrder // 🚀 NEW: Imported the cancel function
// } = require('../controllers/orderController');

// // User Routes
// router.post('/', createOrder);
// router.put('/:id/pay', simulatePayment);
// router.get('/user/:userId', getUserOrders); // Matches frontend fetch URL
// router.put('/:id/cancel', cancelOrder); // 🚀 NEW: The route for cancelling an order

// // Admin Routes
// router.get('/admin/all', getAllOrders);
// router.put('/admin/:id/status', updateOrderStatus);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require('multer'); // 🚀 Require multer
// const path = require('path');

// // 🚀 Configure Multer for Invoices
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Save to your uploads folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, 'invoice-' + Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage });

// const { 
//   createOrder, simulatePayment, getUserOrders, getAllOrders, updateOrderStatus, cancelOrder, 
//   uploadInvoice // 🚀 Import new function
// } = require('../controllers/orderController');

// // Existing Routes...
// router.post('/', createOrder);
// router.put('/:id/pay', simulatePayment);
// router.get('/user/:userId', getUserOrders); 
// router.put('/:id/cancel', cancelOrder); 
// router.get('/admin/all', getAllOrders);
// router.put('/admin/:id/status', updateOrderStatus);

// // 🚀 NEW: Route for uploading invoices
// router.put('/admin/:id/invoice', upload.single('invoice'), uploadInvoice);

// module.exports = router;



// // routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer'); 
// const path = require('path');

// // 🚀 Configure Multer for Invoices
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, 'invoice-' + Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage });

// const { 
//   createOrder, simulatePayment, getUserOrders, getAllOrders, updateOrderStatus, cancelOrder, uploadInvoice 
// } = require('../controllers/orderController');

// // 🚀 IMPORT RAZORPAY CONTROLLERS
// const { createRazorpayOrder, verifyRazorpayPayment } = require('../controllers/paymentController');

// // ==========================================
// // 🚀 RAZORPAY ROUTES (MUST BE AT THE TOP)
// // ==========================================
// router.post('/razorpay/create', createRazorpayOrder);
// router.post('/razorpay/verify', verifyRazorpayPayment);

// // ==========================================
// // EXISTING ORDER ROUTES
// // ==========================================
// router.post('/', createOrder);
// router.put('/:id/pay', simulatePayment);
// router.get('/user/:userId', getUserOrders); 
// router.put('/:id/cancel', cancelOrder); 
// router.get('/admin/all', getAllOrders);
// router.put('/admin/:id/status', updateOrderStatus);
// router.put('/admin/:id/invoice', upload.single('invoice'), uploadInvoice);

// module.exports = router;



// // routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer'); 
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) { cb(null, 'uploads/'); },
//   filename: function (req, file, cb) { cb(null, 'invoice-' + Date.now() + path.extname(file.originalname)); }
// });
// const upload = multer({ storage: storage });

// const { 
//   createOrder, simulatePayment, getUserOrders, getAllOrders, updateOrderStatus, cancelOrder, uploadInvoice,
//   fulfillManual, fulfillShiprocket // 🚀 NEW IMPORTS
// } = require('../controllers/orderController');

// const { createRazorpayOrder, verifyRazorpayPayment } = require('../controllers/paymentController');

// router.post('/razorpay/create', createRazorpayOrder);
// router.post('/razorpay/verify', verifyRazorpayPayment);

// router.post('/', createOrder);
// router.put('/:id/pay', simulatePayment);
// router.get('/user/:userId', getUserOrders); 
// router.put('/:id/cancel', cancelOrder); 
// router.get('/admin/all', getAllOrders);
// router.put('/admin/:id/status', updateOrderStatus);
// router.put('/admin/:id/invoice', upload.single('invoice'), uploadInvoice);

// // 🚀 NEW FULFILLMENT ROUTES
// router.put('/admin/:id/fulfill/manual', fulfillManual);
// router.put('/admin/:id/fulfill/shiprocket', fulfillShiprocket);

// module.exports = router;

// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) { cb(null, 'invoice-' + Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: storage });

// 🚀 WE NOW IMPORT RAZORPAY FUNCTIONS DIRECTLY FROM ORDER CONTROLLER
const { 
  createOrder, simulatePayment, getUserOrders, getAllOrders, updateOrderStatus, cancelOrder, uploadInvoice,
  fulfillManual, fulfillShiprocket, getLiveTracking,
  handleShiprocketWebhook,
  createRazorpayOrder, verifyRazorpayPayment 
} = require('../controllers/orderController');

// 🚀 SHIPROCKET WEBHOOK
router.post('/webhook/shiprocket', handleShiprocketWebhook);

// 🚀 RAZORPAY ROUTES
router.post('/razorpay/create', createRazorpayOrder);
router.post('/razorpay/verify', verifyRazorpayPayment);

// STANDARD ORDER ROUTES
router.post('/', createOrder);
router.put('/:id/pay', simulatePayment);
router.get('/user/:userId', getUserOrders); 
router.put('/:id/cancel', cancelOrder); 
router.get('/admin/all', getAllOrders);
router.put('/admin/:id/status', updateOrderStatus);
router.put('/admin/:id/invoice', upload.single('invoice'), uploadInvoice);

// FULFILLMENT ROUTES
router.put('/admin/:id/fulfill/manual', fulfillManual);
router.put('/admin/:id/fulfill/shiprocket', fulfillShiprocket);

// LIVE TRACKING ROUTE
router.get('/:id/tracking', getLiveTracking);

module.exports = router;