// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');


// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json()); 
// // app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors()); 
// app.use('/uploads', express.static('uploads'));

// // ==========================================
// // ROUTES (This is what connects the URL to your authController)
// // ==========================================
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/products', require('./routes/productRoutes')); // <-- ADD THIS LINE
// app.use('/api/orders', require('./routes/orderRoutes')); // <-- ADD THIS LINE
// app.use('/api/wallet', require('./routes/walletRoutes')); // <-- ADD THIS LINE
// app.use('/api/withdrawals', require('./routes/withdrawalRoutes'));

// // Database Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected Successfully'))
//   .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// // Basic Test Route
// app.get('/', (req, res) => {
//   res.send('E-commerce API is running...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// 🚀 IMPORT DNS MODULE
const dns = require('dns'); 
// 🚀 THE MAGIC FIX: Force Node.js to use IPv4 instead of IPv6 for Render!
dns.setDefaultResultOrder('ipv4first');

dotenv.config();

const app = express();

// ==========================================
// 🚀 STRICT PRODUCTION CORS SETUP
// ==========================================
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://amazonsmartz.vercel.app', // Your actual Vercel URL!
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// ==========================================
// ROUTES 
// ==========================================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes')); 
app.use('/api/orders', require('./routes/orderRoutes')); 
app.use('/api/wallet', require('./routes/walletRoutes')); 
app.use('/api/withdrawals', require('./routes/withdrawalRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Basic Test Route
app.get('/', (req, res) => {
  res.send('E-commerce API is running securely...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});