// // models/Product.js
// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     seoTitle: { type: String },
//   seoDescription: { type: String },
//   seoKeywords: { type: String }, // Store as "phone, smartphone, electronics"
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   discountPrice: { type: Number },
//   category: { type: String, required: true },
//   brand: { type: String, required: true, default: 'Generic' }, // 🚀 ADD THIS LINE
//   stock: { type: Number, required: true, default: 10 },
  
//   // 🚀 NEW: Advanced Gadget Fields
//   images: [{ type: String }], // Can be PC Upload URL or Web URL
//   banners: [{ type: String }], // Wide banners for the product page
//   features: [{ type: String }], // Array of strings e.g. ["200MP Camera", "Titanium Body"]
//   specs: [
//     { name: String, value: String } // e.g. { name: "RAM", value: "12GB" }
//   ],
  
//   isBestSeller: { type: Boolean, default: false },
//   ratings: { type: Number, default: 0 },
//   numOfReviews: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);


// // models/Product.js
// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   seoTitle: { type: String },
//   seoDescription: { type: String },
//   seoKeywords: { type: String }, 
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   discountPrice: { type: Number },
//   category: { type: String, required: true },
//   brand: { type: String, required: true, default: 'Generic' }, 
//   stock: { type: Number, required: true, default: 10 },
  
//   images: [{ type: String }], 
//   banners: [{ type: String }], 
//   features: [{ type: String }], 
  
//   // 🚀 UPGRADED: Variants now store a priceModifier!
//   variants: [
//     {
//       name: { type: String, required: true },
//       options: [
//         { 
//           name: { type: String, required: true },
//           priceModifier: { type: Number, default: 0 } // e.g. 5000 for 256GB
//         }
//       ]
//     }
//   ],

//   specs: [
//     { name: String, value: String } 
//   ],
  
//   isBestSeller: { type: Boolean, default: false },
//   ratings: { type: Number, default: 0 },
//   numOfReviews: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);




// // models/Product.js
// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   seoTitle: { type: String },
//   seoDescription: { type: String },
//   seoKeywords: { type: String }, 
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   discountPrice: { type: Number },
//   category: { type: String, required: true },
//   brand: { type: String, required: true, default: 'Generic' }, 
//   stock: { type: Number, required: true, default: 10 },
  
//   images: [{ type: String }], 
//   banners: [{ type: String }], 
//   features: [{ type: String }], 
  
//   variants: [
//     {
//       name: { type: String, required: true },
//       options: [
//         { 
//           name: { type: String, required: true },
//           priceModifier: { type: Number, default: 0 } 
//         }
//       ]
//     }
//   ],

//   specs: [
//     { name: String, value: String } 
//   ],

//   // 🚀 ADDED: Dynamic Trust Badges
//   returnPolicy: { type: String, default: '7 Days Replacement' },
//   warrantyPolicy: { type: String, default: '1 Year Warranty' },
  
//   isBestSeller: { type: Boolean, default: false },
//   ratings: { type: Number, default: 4 }, // Added default rating
//   numOfReviews: { type: Number, default: 1284 } // Added default review count
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);



// // models/Product.js
// const mongoose = require('mongoose');

// // 🚀 NEW: Review Schema
// const reviewSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true },
//   isApproved: { type: Boolean, default: false } // Admin must approve before it goes live
// }, { timestamps: true });

// const productSchema = new mongoose.Schema({
//   seoTitle: { type: String },
//   seoDescription: { type: String },
//   seoKeywords: { type: String }, 
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   discountPrice: { type: Number },
//   category: { type: String, required: true },
//   brand: { type: String, required: true, default: 'Generic' }, 
//   stock: { type: Number, required: true, default: 10 },
  
//   images: [{ type: String }], 
//   banners: [{ type: String }], 
//   features: [{ type: String }], 
  
//   variants: [
//     {
//       name: { type: String, required: true },
//       options: [
//         { 
//           name: { type: String, required: true },
//           priceModifier: { type: Number, default: 0 } 
//         }
//       ]
//     }
//   ],

//   specs: [
//     { name: String, value: String } 
//   ],

//   returnPolicy: { type: String, default: '7 Days Replacement' },
//   warrantyPolicy: { type: String, default: '1 Year Warranty' },
  
//   isBestSeller: { type: Boolean, default: false },
  
//   // 🚀 ADDED: Reviews array and dynamic rating numbers
//   reviews: [reviewSchema],
//   ratings: { type: Number, default: 0 }, 
//   numOfReviews: { type: Number, default: 0 } 
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);


// models/Product.js
const mongoose = require('mongoose');

// 🚀 Review Schema
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: false } // Admin must approve before it goes live
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: String }, 
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  category: { type: String, required: true },
  brand: { type: String, required: true, default: 'Generic' }, 
  stock: { type: Number, required: true, default: 10 },
  
  images: [{ type: String }], 
  banners: [{ type: String }], 
  features: [{ type: String }], 
  
  variants: [
    {
      name: { type: String, required: true },
      options: [
        { 
          name: { type: String, required: true },
          priceModifier: { type: Number, default: 0 } 
        }
      ]
    }
  ],

  specs: [
    { name: String, value: String } 
  ],

  returnPolicy: { type: String, default: '7 Days Replacement' },
  warrantyPolicy: { type: String, default: '1 Year Warranty' },
  isBestSeller: { type: Boolean, default: false },
  
  // 🚀 NEW: ADMIN CANCELLATION CONTROLS
  isCancellable: { type: Boolean, default: true },
  cancellationWindowHours: { type: Number, default: 24 },
  
  // Reviews array and dynamic rating numbers
  reviews: [reviewSchema],
  ratings: { type: Number, default: 0 }, 
  numOfReviews: { type: Number, default: 0 } 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);