// // models/Order.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   orderItems: [
//     {
//       name: { type: String, required: true },
//       quantity: { type: Number, required: true },
//       image: { type: String, required: true },
//       price: { type: Number, required: true },
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     }
//   ],
//   shippingAddress: {
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     country: { type: String, required: true },
//   },
//   paymentMethod: { type: String, required: true, default: 'Razorpay' },
//   paymentResult: {
//     razorpay_order_id: { type: String },
//     razorpay_payment_id: { type: String },
//     razorpay_signature: { type: String },
//   },
//   itemsPrice: { type: Number, required: true },
//   shippingPrice: { type: Number, required: true },
//   totalPrice: { type: Number, required: true },
//   isPaid: { type: Boolean, required: true, default: false },
//   paidAt: { type: Date },
//   isDelivered: { type: Boolean, required: true, default: false },
//   deliveredAt: { type: Date },
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);


// // models/Order.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   orderItems: [
//     {
//       name: { type: String, required: true },
//       quantity: { type: Number, required: true },
//       image: { type: String, required: true },
//       price: { type: Number, required: true },
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       selectedOptions: { type: Object, default: {} }
//     }
//   ],
  
//   // 🚀 UPDATED: Matches the Checkout form perfectly
//   shippingAddress: {
//     fullName: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     pincode: { type: String, required: true }, // Changed from postalCode to match frontend
//     country: { type: String, default: 'India' }, 
//   },

//   paymentMethod: { type: String, required: true, default: 'Razorpay' },
//   paymentResult: {
//     razorpay_order_id: { type: String },
//     razorpay_payment_id: { type: String },
//     razorpay_signature: { type: String },
//   },

//   // Added defaults so the database doesn't crash if these aren't sent right away
//   itemsPrice: { type: Number, default: 0 },
//   shippingPrice: { type: Number, default: 0 },
//   totalPrice: { type: Number, required: true },
  
//   isPaid: { type: Boolean, required: true, default: false },
//   paidAt: { type: Date },

//   // 🚀 ADDED: Status for the Admin Dashboard Dropdown
//   status: { type: String, default: 'Processing' },
// // Inside models/Order.js, add this right below your status field:
// invoiceUrl: { type: String },

  
//   isDelivered: { type: Boolean, required: true, default: false },
//   deliveredAt: { type: Date },
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);

// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      selectedOptions: { type: Object, default: {} }
    }
  ],
  
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }, 
    country: { type: String, default: 'India' }, 
  },

  paymentMethod: { type: String, required: true, default: 'Razorpay' },
  paymentResult: {
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String },
  },

  // 🚀 NEW: SHIPPING FULFILLMENT TRACKING
  shippingDetails: {
    provider: { type: String, enum: ['Pending', 'Manual', 'Shiprocket'], default: 'Pending' },
    carrierName: { type: String }, 
    trackingId: { type: String },  
    shiprocketOrderId: { type: String },
    shiprocketShipmentId: { type: String },
    labelUrl: { type: String }
  },

  itemsPrice: { type: Number, default: 0 },
  shippingPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  couponCode: { type: String, default: null },
  
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },

  status: { type: String, default: 'Processing' },
  invoiceUrl: { type: String },
  
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);