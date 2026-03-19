// // // controllers/orderController.js
// // const Order = require('../models/Order');
// // const Razorpay = require('razorpay');
// // const crypto = require('crypto');

// // // Initialize Razorpay
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// // // 1. Create Order & Generate Razorpay ID
// // exports.createOrder = async (req, res) => {
// //   try {
// //     const { orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

// //     if (orderItems && orderItems.length === 0) {
// //       return res.status(400).json({ message: 'No order items' });
// //     }

// //     // IMPORTANT: For testing, we will hardcode a fake user ID until we link the frontend login.
// //     // In production, this comes from req.user._id (from JWT token).
// //     const fakeUserId = "60d5ecb8b392d700153ee000"; 

// //     // Create a new order in MongoDB
// //     const order = new Order({
// //       user: fakeUserId, 
// //       orderItems,
// //       shippingAddress,
// //       itemsPrice,
// //       shippingPrice,
// //       totalPrice,
// //     });
// //     const createdOrder = await order.save();

// //     // Create an order in Razorpay
// //     const options = {
// //       amount: Math.round(totalPrice * 100), // Razorpay expects amount in paise (multiply by 100)
// //       currency: "INR",
// //       receipt: `receipt_order_${createdOrder._id}`,
// //     };

// //     const razorpayOrder = await razorpay.orders.create(options);

// //     res.status(201).json({
// //       orderId: createdOrder._id,
// //       razorpayOrderId: razorpayOrder.id,
// //       amount: razorpayOrder.amount,
// //       currency: razorpayOrder.currency
// //     });

// //   } catch (error) {
// //     console.error("Order Creation Error:", error);
// //     res.status(500).json({ message: 'Server error during order creation', error: error.message });
// //   }
// // };

// // // 2. Simulate Payment Success (FOR TESTING ONLY)
// // exports.simulatePayment = async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id);

// //     if (order) {
// //       order.isPaid = true;
// //       order.paidAt = Date.now();
// //       order.paymentResult = {
// //         razorpay_order_id: `fake_order_${Date.now()}`,
// //         razorpay_payment_id: `fake_payment_${Date.now()}`,
// //         razorpay_signature: "fake_signature",
// //       };

// //       const updatedOrder = await order.save();
      
// //       // We will trigger the Referral Commission logic here later!

// //       res.json(updatedOrder);
// //     } else {
// //       res.status(404).json({ message: 'Order not found' });
// //     }
// //   } catch (error) {
// //     console.error("Payment Simulation Error:", error);
// //     res.status(500).json({ message: 'Server error during payment simulation' });
// //   }
// // };



// // // controllers/orderController.js
// // const Order = require('../models/Order');
// // const Razorpay = require('razorpay');
// // const crypto = require('crypto');
// // // const Order = require('../models/Order');
// // const User = require('../models/User'); // <-- ADD THIS
// // const WalletTransaction = require('../models/WalletTransaction'); // <-- ADD THIS
// // // const Razorpay = require('razorpay');

// // // Initialize Razorpay (We add fallback dummy strings so it doesn't crash on server start)
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
// //   key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
// // });

// // // 1. Create Order & Generate Razorpay ID (SIMULATED)
// // exports.createOrder = async (req, res) => {
// //   try {
// //     // Extract userId from req.body
// //     const { userId, orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

// //     if (orderItems && orderItems.length === 0) {
// //       return res.status(400).json({ message: 'No order items' });
// //     }

// //     // Create a new order in MongoDB using the REAL user ID
// //     const order = new Order({
// //       user: userId || "60d5ecb8b392d700153ee000", // Fallback just in case
// //       orderItems,
// //       shippingAddress,
// //       itemsPrice,
// //       shippingPrice,
// //       totalPrice,
// //     });
// //     const createdOrder = await order.save();

// //     /* ==========================================
// //        RAZORPAY API CALL DISABLED FOR TESTING
// //        ==========================================
// //     const options = {
// //       amount: Math.round(totalPrice * 100), // Razorpay expects amount in paise (multiply by 100)
// //       currency: "INR",
// //       receipt: `receipt_order_${createdOrder._id}`,
// //     };
// //     const razorpayOrder = await razorpay.orders.create(options);
// //        ========================================== */

// //     // SEND SIMULATED SUCCESS RESPONSE TO FRONTEND
// //     res.status(201).json({
// //       orderId: createdOrder._id,
// //       razorpayOrderId: `fake_razorpay_order_${Date.now()}`,
// //       amount: Math.round(totalPrice * 100),
// //       currency: "INR"
// //     });

// //   } catch (error) {
// //     console.error("Order Creation Error:", error);
// //     res.status(500).json({ message: 'Server error during order creation', error: error.message });
// //   }
// // };

// // // 2. Simulate Payment Success (FOR TESTING ONLY)
// // exports.simulatePayment = async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id);

// //     if (order) {
// //       order.isPaid = true;
// //       order.paidAt = Date.now();
// //       order.paymentResult = {
// //         razorpay_order_id: `fake_order_${Date.now()}`,
// //         razorpay_payment_id: `fake_payment_${Date.now()}`,
// //         razorpay_signature: "fake_signature",
// //       };

// //       const updatedOrder = await order.save();
      
// //       // ==========================================
// //       // 🚀 AFFILIATE COMMISSION ENGINE
// //       // ==========================================
// //       try {
// //         // 1. Find the user who just bought the item
// //         const buyingUser = await User.findById(order.user);

// //         // 2. Check if they were referred by someone
// //         if (buyingUser && buyingUser.referredBy) {
// //           const referrer = await User.findById(buyingUser.referredBy);
          
// //           if (referrer) {
// //             // 3. Calculate Commission (Let's do a flat 5% of the items price)
// //             const commissionAmount = Math.round(order.itemsPrice * 0.05);

// //             // 4. Add money to the Referrer's Wallet
// //             referrer.wallet.availableBalance += commissionAmount;
// //             referrer.wallet.totalEarnings += commissionAmount;
// //             await referrer.save();

// //             // 5. Create a Receipt in the Ledger
// //             await WalletTransaction.create({
// //               userId: referrer._id,
// //               amount: commissionAmount,
// //               type: 'credit',
// //               source: 'referral_commission',
// //               status: 'completed',
// //               relatedOrderId: order._id
// //             });

// //             console.log(`💰 COMMISSION PAID! ₹${commissionAmount} added to ${referrer.name}'s wallet.`);
// //           }
// //         }
// //       } catch (commissionError) {
// //         console.error("Commission calculation failed, but order was paid:", commissionError);
// //         // We don't want to crash the payment response if commission fails, so we just log it.
// //       }
// //       // ==========================================

// //       res.json(updatedOrder);
// //     } else {
// //       res.status(404).json({ message: 'Order not found' });
// //     }
// //   } catch (error) {
// //     console.error("Payment Simulation Error:", error);
// //     res.status(500).json({ message: 'Server error during payment simulation' });
// //   }
// // };

// // // Fetch orders for a specific user
// // exports.getUserOrders = async (req, res) => {
// //   try {
// //     // Find all orders where the user ID matches, and sort by newest (-1)
// //     const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
// //     res.status(200).json(orders);
// //   } catch (error) {
// //     console.error("Fetch Orders Error:", error);
// //     res.status(500).json({ message: 'Error fetching your orders' });
// //   }
// // };

// // // / --- ADMIN: Get all orders across the whole platform ---/
// // exports.getAllOrders = async (req, res) => {
// //   try {
// //     // We use .populate('user') to get the customer's name and email attached to the order!
// //     const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
// //     res.status(200).json(orders);
// //   } catch (error) {
// //     console.error("Admin Fetch Orders Error:", error);
// //     res.status(500).json({ message: 'Error fetching all orders' });
// //   }
// // };

// // // --- ADMIN: Update Order Status ---
// // exports.updateOrderStatus = async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id);
// //     if (!order) return res.status(404).json({ message: 'Order not found' });
    
// //     order.status = req.body.status;
// //     await order.save();
    
// //     res.status(200).json({ message: 'Order status updated successfully', order });
// //   } catch (error) {
// //     console.error("Update Status Error:", error);
// //     res.status(500).json({ message: 'Error updating order status' });
// //   }
// // };



// // controllers/orderController.js
// const Order = require('../models/Order');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');

// // Initialize Razorpay (We add fallback dummy strings so it doesn't crash on server start)
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
//   key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
// });

// // 1. Create Order & Generate Razorpay ID (SIMULATED)
// exports.createOrder = async (req, res) => {
//   try {
//     // Extract data from frontend checkout payload
//     const { userId, orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

//     if (orderItems && orderItems.length === 0) {
//       return res.status(400).json({ message: 'No order items' });
//     }

//     // 🚀 FIX: If frontend doesn't send itemsPrice, fallback to totalPrice so commission doesn't become 0
//     const finalItemsPrice = itemsPrice || totalPrice;

//     // Create a new order in MongoDB
//     const order = new Order({
//       user: userId, 
//       orderItems,
//       shippingAddress,
//       itemsPrice: finalItemsPrice,
//       shippingPrice: shippingPrice || 0,
//       totalPrice,
//       status: 'Processing' // 🚀 FIX: Set default status for the Admin Panel
//     });
    
//     const createdOrder = await order.save();

//     /* ==========================================
//        RAZORPAY API CALL DISABLED FOR TESTING
//        ==========================================
//     const options = {
//       amount: Math.round(totalPrice * 100), // Razorpay expects amount in paise (multiply by 100)
//       currency: "INR",
//       receipt: `receipt_order_${createdOrder._id}`,
//     };
//     const razorpayOrder = await razorpay.orders.create(options);
//        ========================================== */

//     // SEND SIMULATED SUCCESS RESPONSE TO FRONTEND
//     res.status(201).json({
//       message: 'Order created successfully',
//       order: createdOrder,
//       orderId: createdOrder._id,
//       razorpayOrderId: `fake_razorpay_order_${Date.now()}`,
//       amount: Math.round(totalPrice * 100),
//       currency: "INR"
//     });

//   } catch (error) {
//     console.error("Order Creation Error:", error);
//     res.status(500).json({ message: 'Server error during order creation', error: error.message });
//   }
// };

// // 2. Simulate Payment Success (FOR TESTING ONLY)
// exports.simulatePayment = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         razorpay_order_id: `fake_order_${Date.now()}`,
//         razorpay_payment_id: `fake_payment_${Date.now()}`,
//         razorpay_signature: "fake_signature",
//       };

//       const updatedOrder = await order.save();
      
//       // ==========================================
//       // 🚀 AFFILIATE COMMISSION ENGINE
//       // ==========================================
//       try {
//         // 1. Find the user who just bought the item
//         const buyingUser = await User.findById(order.user);

//         // 2. Check if they were referred by someone
//         if (buyingUser && buyingUser.referredBy) {
//           const referrer = await User.findById(buyingUser.referredBy);
          
//           if (referrer) {
//             // 3. Calculate Commission (Flat 5% of the items price)
//             // 🚀 FIX: Safely fallback to totalPrice if itemsPrice somehow is 0
//             const baseAmount = order.itemsPrice > 0 ? order.itemsPrice : order.totalPrice;
//             const commissionAmount = Math.round(baseAmount * 0.05);

//             // 4. Add money to the Referrer's Wallet
//             referrer.wallet.availableBalance += commissionAmount;
//             referrer.wallet.totalEarnings += commissionAmount;
//             await referrer.save();

//             // 5. Create a Receipt in the Ledger
//             await WalletTransaction.create({
//               userId: referrer._id,
//               amount: commissionAmount,
//               type: 'credit',
//               source: 'referral_commission',
//               status: 'completed',
//               relatedOrderId: order._id
//             });

//             console.log(`💰 COMMISSION PAID! ₹${commissionAmount} added to ${referrer.name}'s wallet.`);
//           }
//         }
//       } catch (commissionError) {
//         console.error("Commission calculation failed, but order was paid:", commissionError);
//       }
//       // ==========================================

//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: 'Order not found' });
//     }
//   } catch (error) {
//     console.error("Payment Simulation Error:", error);
//     res.status(500).json({ message: 'Server error during payment simulation' });
//   }
// };

// // Fetch orders for a specific user
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Fetch Orders Error:", error);
//     res.status(500).json({ message: 'Error fetching your orders' });
//   }
// };

// // --- ADMIN: Get all orders across the whole platform ---
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Admin Fetch Orders Error:", error);
//     res.status(500).json({ message: 'Error fetching all orders' });
//   }
// };

// // --- ADMIN: Update Order Status ---
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });
    
//     order.status = req.body.status;
//     await order.save();
    
//     res.status(200).json({ message: 'Order status updated successfully', order });
//   } catch (error) {
//     console.error("Update Status Error:", error);
//     res.status(500).json({ message: 'Error updating order status' });
//   }
// };


// // controllers/orderController.js
// const Order = require('../models/Order');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');

// // 1. Create Order (WITH VARIANT FIX)
// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

//     if (orderItems && orderItems.length === 0) {
//       return res.status(400).json({ message: 'No order items' });
//     }

//     // 🚀 We safely map the items to ensure selectedOptions (variants) are captured
//     const mappedOrderItems = orderItems.map(item => ({
//       name: item.name,
//       quantity: item.quantity || item.qty, 
//       image: item.image,
//       price: item.price,
//       product: item.product,
//       selectedOptions: item.selectedOptions || {} 
//     }));

//     const finalItemsPrice = itemsPrice || totalPrice;

//     const order = new Order({
//       user: userId, 
//       orderItems: mappedOrderItems, 
//       shippingAddress,
//       itemsPrice: finalItemsPrice,
//       shippingPrice: shippingPrice || 0,
//       totalPrice,
//       status: 'Processing' 
//     });
    
//     const createdOrder = await order.save();

//     res.status(201).json({
//       message: 'Order created successfully',
//       order: createdOrder,
//       orderId: createdOrder._id,
//       amount: Math.round(totalPrice * 100),
//       currency: "INR"
//     });

//   } catch (error) {
//     console.error("Order Creation Error:", error);
//     res.status(500).json({ message: 'Server error during order creation', error: error.message });
//   }
// };

// // 2. Simulate Payment Success & Affiliate Logic
// exports.simulatePayment = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         razorpay_order_id: `fake_order_${Date.now()}`,
//         razorpay_payment_id: `fake_payment_${Date.now()}`,
//         razorpay_signature: "fake_signature",
//       };

//       const updatedOrder = await order.save();
      
//       // 🚀 AFFILIATE COMMISSION ENGINE
//       try {
//         const buyingUser = await User.findById(order.user);

//         if (buyingUser && buyingUser.referredBy) {
//           const referrer = await User.findById(buyingUser.referredBy);
          
//           if (referrer) {
//             const baseAmount = order.itemsPrice > 0 ? order.itemsPrice : order.totalPrice;
//             const commissionAmount = Math.round(baseAmount * 0.05);

//             referrer.wallet.availableBalance += commissionAmount;
//             referrer.wallet.totalEarnings += commissionAmount;
//             await referrer.save();

//             await WalletTransaction.create({
//               userId: referrer._id,
//               amount: commissionAmount,
//               type: 'credit',
//               source: 'referral_commission',
//               status: 'completed',
//               relatedOrderId: order._id
//             });

//             console.log(`💰 COMMISSION PAID! ₹${commissionAmount} added to ${referrer.name}'s wallet.`);
//           }
//         }
//       } catch (commissionError) {
//         console.error("Commission calculation failed, but order was paid:", commissionError);
//       }

//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: 'Order not found' });
//     }
//   } catch (error) {
//     console.error("Payment Simulation Error:", error);
//     res.status(500).json({ message: 'Server error during payment simulation' });
//   }
// };

// // 3. Fetch orders for a specific user
// // exports.getUserOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
// //     res.status(200).json(orders);
// //   } catch (error) {
// //     console.error("Fetch Orders Error:", error);
// //     res.status(500).json({ message: 'Error fetching your orders' });
// //   }
// // };
// exports.getUserOrders = async (req, res) => {
//   try {
//     // 🚀 It MUST be req.params.userId to match our route
//     const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching your orders' });
//   }
// };
// // 4. ADMIN: Get all orders across the whole platform
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Admin Fetch Orders Error:", error);
//     res.status(500).json({ message: 'Error fetching all orders' });
//   }
// };

// // 5. ADMIN: Update Order Status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });
    
//     order.status = req.body.status;
//     await order.save();
    
//     res.status(200).json({ message: 'Order status updated successfully', order });
//   } catch (error) {
//     console.error("Update Status Error:", error);
//     res.status(500).json({ message: 'Error updating order status' });
//   }
// };


// // controllers/orderController.js
// const Order = require('../models/Order');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');
// const Product = require('../models/Product');
// const { createNotification } = require('./notificationController');

// // 1. Create Order (WITH VARIANT FIX)
// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

//     if (orderItems && orderItems.length === 0) {
//       return res.status(400).json({ message: 'No order items' });
//     }

//     const mappedOrderItems = orderItems.map(item => ({
//       name: item.name,
//       quantity: item.quantity || item.qty, 
//       image: item.image,
//       price: item.price,
//       product: item.product,
//       selectedOptions: item.selectedOptions || {} 
//     }));

//     const finalItemsPrice = itemsPrice || totalPrice;

//     const order = new Order({
//       user: userId, 
//       orderItems: mappedOrderItems, 
//       shippingAddress,
//       itemsPrice: finalItemsPrice,
//       shippingPrice: shippingPrice || 0,
//       totalPrice,
//       status: 'Processing' 
//     });
    
//     const createdOrder = await order.save();

//     res.status(201).json({
//       message: 'Order created successfully',
//       order: createdOrder,
//       orderId: createdOrder._id,
//       amount: Math.round(totalPrice * 100),
//       currency: "INR"
//     });

//   } catch (error) {
//     console.error("Order Creation Error:", error);
//     res.status(500).json({ message: 'Server error during order creation', error: error.message });
//   }
// };

// // 2. Simulate Payment Success & Affiliate Logic
// exports.simulatePayment = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         razorpay_order_id: `fake_order_${Date.now()}`,
//         razorpay_payment_id: `fake_payment_${Date.now()}`,
//         razorpay_signature: "fake_signature",
//       };

//       const updatedOrder = await order.save();
      
//       // 🚀 AFFILIATE COMMISSION ENGINE
//       try {
//         const buyingUser = await User.findById(order.user);

//         if (buyingUser && buyingUser.referredBy) {
//           const referrer = await User.findById(buyingUser.referredBy);
          
//           if (referrer) {
//             const baseAmount = order.itemsPrice > 0 ? order.itemsPrice : order.totalPrice;
//             const commissionAmount = Math.round(baseAmount * 0.05);

//             referrer.wallet.availableBalance += commissionAmount;
//             referrer.wallet.totalEarnings += commissionAmount;
//             await referrer.save();

//             await WalletTransaction.create({
//               userId: referrer._id,
//               amount: commissionAmount,
//               type: 'credit',
//               source: 'referral_commission',
//               status: 'completed',
//               relatedOrderId: order._id
//             });

//             console.log(`💰 COMMISSION PAID! ₹${commissionAmount} added to ${referrer.name}'s wallet.`);
//           }
//         }
//       } catch (commissionError) {
//         console.error("Commission calculation failed, but order was paid:", commissionError);
//       }

//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: 'Order not found' });
//     }
//   } catch (error) {
//     console.error("Payment Simulation Error:", error);
//     res.status(500).json({ message: 'Server error during payment simulation' });
//   }
// };

// // 3. Fetch orders for a specific user
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching your orders' });
//   }
// };

// // 4. ADMIN: Get all orders across the whole platform
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Admin Fetch Orders Error:", error);
//     res.status(500).json({ message: 'Error fetching all orders' });
//   }
// };

// // 5. ADMIN: Update Order Status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });
    
//     order.status = req.body.status;
//     await order.save();
//     // 🚀 Send Notification to User
//     await createNotification(
//       order.user,
//       "Order Status Updated",
//       `Your order #${order._id.toString().slice(-6).toUpperCase()} is now marked as: ${req.body.status}.`,
//       "alert",
//       "/orders"
//     );
//     res.status(200).json({ message: 'Order status updated successfully', order });
//   } catch (error) {
//     console.error("Update Status Error:", error);
//     res.status(500).json({ message: 'Error updating order status' });
//   }
// };

// exports.uploadInvoice = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Save the file path to the order
//     order.invoiceUrl = req.file.path.replace(/\\/g, "/"); // Normalize slashes for Windows/Linux
//     await order.save();
//     // 🚀 Send Notification to User
//     await createNotification(
//       order.user,
//       "Invoice Uploaded",
//       `The invoice for your order #${order._id.toString().slice(-6).toUpperCase()} is now available to download.`,
//       "invoice",
//       "/orders"
//     );

//     res.status(200).json({ message: 'Invoice uploaded successfully', invoiceUrl: order.invoiceUrl });
//   } catch (error) {
//     console.error("Upload Invoice Error:", error);
//     res.status(500).json({ message: 'Error uploading invoice', error: error.message });
//   }
// };

// // 🚀 6. NEW: SECURE ORDER CANCELLATION
// exports.cancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('orderItems.product');
    
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // 1. Check if the order is already in a non-cancellable state
//     if (order.status === 'Shipped' || order.status === 'Delivered' || order.status === 'Cancelled') {
//       return res.status(400).json({ message: `Cannot cancel an order that is currently: ${order.status}` });
//     }

//     // 2. Grab the first product in the order to check Admin Rules
//     // (Assuming the primary product dictates the order's rules)
//     const primaryProduct = order.orderItems[0].product;

//     if (primaryProduct && primaryProduct.isCancellable === false) {
//       return res.status(400).json({ message: 'This item is strictly non-cancellable as per seller policy.' });
//     }

//     // 3. Check the Timeline
//     const orderTime = new Date(order.createdAt).getTime();
//     const now = Date.now();
//     const hoursPassed = (now - orderTime) / (1000 * 60 * 60);
//     const allowedWindow = primaryProduct?.cancellationWindowHours !== undefined ? primaryProduct.cancellationWindowHours : 24;

//     if (hoursPassed > allowedWindow) {
//       return res.status(400).json({ message: `The allowed cancellation window of ${allowedWindow} hours has passed.` });
//     }

//     // 4. All checks passed, cancel the order
//     order.status = 'Cancelled';
//     await order.save();
//     // 🚀 Send Notification to User
//     await createNotification(
//       order.user,
//       "Order Cancelled",
//       `Your order #${order._id.toString().slice(-6).toUpperCase()} was successfully cancelled.`,
//       "cancel",
//       "/orders"
//     );

//     res.status(200).json({ message: 'Order cancelled successfully', order });
//   } catch (error) {
//     console.error("Cancel Order Error:", error);
//     res.status(500).json({ message: 'Server error processing cancellation', error: error.message });
//   }
// };

// // controllers/orderController.js
// const Order = require('../models/Order');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');
// const Product = require('../models/Product');
// const { createNotification } = require('./notificationController');
// const sendEmail = require('../utils/sendEmail'); // 🚀 IMPORTED EMAIL UTILITY

// // 1. Create Order (WITH EMAIL NOTIFICATION)
// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

//     if (orderItems && orderItems.length === 0) {
//       return res.status(400).json({ message: 'No order items' });
//     }

//     const mappedOrderItems = orderItems.map(item => ({
//       name: item.name,
//       quantity: item.quantity || item.qty, 
//       image: item.image,
//       price: item.price,
//       product: item.product,
//       selectedOptions: item.selectedOptions || {} 
//     }));

//     const finalItemsPrice = itemsPrice || totalPrice;

//     const order = new Order({
//       user: userId, 
//       orderItems: mappedOrderItems, 
//       shippingAddress,
//       itemsPrice: finalItemsPrice,
//       shippingPrice: shippingPrice || 0,
//       totalPrice,
//       status: 'Processing' 
//     });
    
//     const createdOrder = await order.save();

//     // 🚀 NEW: SEND ORDER CONFIRMATION EMAIL
//     const itemsHtml = mappedOrderItems.map(item => `
//       <tr>
//         <td style="padding: 10px; border-bottom: 1px solid #eee;">
//           <strong style="color: #333;">${item.name}</strong><br>
//           <span style="font-size: 12px; color: #666;">Qty: ${item.quantity}</span>
//         </td>
//         <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
//           ₹${item.price.toLocaleString('en-IN')}
//         </td>
//       </tr>
//     `).join('');

//     const emailTemplate = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
//         <div style="background-color: #232f3e; padding: 20px; text-align: center;">
//           <h1 style="color: #febd69; margin: 0; font-size: 24px;">amazon<span style="color: #fff; font-weight: bold;">smarts</span></h1>
//         </div>
//         <div style="padding: 20px;">
//           <h2 style="color: #007600;">Order Confirmation</h2>
//           <p>Hello,</p>
//           <p>Thank you for your order! We've received it and are preparing it for shipment.</p>
//           <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
//             <p style="margin: 0; font-size: 14px;"><strong>Order ID:</strong> #${createdOrder._id.toString().toUpperCase()}</p>
//           </div>
//           <table style="width: 100%; border-collapse: collapse;">
//             <thead><tr style="background-color: #eee;"><th style="text-align: left; padding: 10px;">Item</th><th style="text-align: right; padding: 10px;">Price</th></tr></thead>
//             <tbody>${itemsHtml}</tbody>
//           </table>
//           <div style="text-align: right; padding: 20px 10px;">
//             <p style="margin: 0;">Subtotal: ₹${finalItemsPrice.toLocaleString('en-IN')}</p>
//             <p style="margin: 5px 0;">Shipping: ₹${(shippingPrice || 0).toLocaleString('en-IN')}</p>
//             <h3 style="margin: 10px 0; color: #B12704;">Total: ₹${totalPrice.toLocaleString('en-IN')}</h3>
//           </div>
//           <div style="border-top: 1px solid #ddd; padding-top: 20px;">
//             <h4 style="margin-bottom: 5px;">Shipping to:</h4>
//             <p style="margin: 0; font-size: 13px; color: #555;">
//               ${shippingAddress.fullName}<br>${shippingAddress.address}<br>
//               ${shippingAddress.city}, ${shippingAddress.pincode}<br>
//               Phone: ${shippingAddress.phone}
//             </p>
//           </div>
//         </div>
//       </div>
//     `;

//     try {
//       await sendEmail({
//         email: shippingAddress.email,
//         subject: `Confirmation: Your Amazon Smarts Order #${createdOrder._id.toString().slice(-6).toUpperCase()}`,
//         message: emailTemplate // Ensure your sendEmail utility handles 'message' as HTML
//       });
//     } catch (err) {
//       console.log("Email service failed, but order was saved.");
//     }

//     res.status(201).json({
//       message: 'Order created successfully',
//       order: createdOrder,
//       orderId: createdOrder._id,
//       amount: Math.round(totalPrice * 100),
//       currency: "INR"
//     });

//   } catch (error) {
//     console.error("Order Creation Error:", error);
//     res.status(500).json({ message: 'Server error during order creation', error: error.message });
//   }
// };

// // 2. Simulate Payment Success & Affiliate Logic
// exports.simulatePayment = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         razorpay_order_id: `fake_order_${Date.now()}`,
//         razorpay_payment_id: `fake_payment_${Date.now()}`,
//         razorpay_signature: "fake_signature",
//       };

//       const updatedOrder = await order.save();
      
//       // 🚀 AFFILIATE COMMISSION ENGINE
//       try {
//         const buyingUser = await User.findById(order.user);

//         if (buyingUser && buyingUser.referredBy) {
//           const referrer = await User.findById(buyingUser.referredBy);
          
//           if (referrer) {
//             const baseAmount = order.itemsPrice > 0 ? order.itemsPrice : order.totalPrice;
//             const commissionAmount = Math.round(baseAmount * 0.05);

//             referrer.wallet.availableBalance += commissionAmount;
//             referrer.wallet.totalEarnings += commissionAmount;
//             await referrer.save();

//             await WalletTransaction.create({
//               userId: referrer._id,
//               amount: commissionAmount,
//               type: 'credit',
//               source: 'referral_commission',
//               status: 'completed',
//               relatedOrderId: order._id
//             });

//             // 🚀 Notify Referrer
//             await createNotification(
//               referrer._id,
//               "Commission Received! 💰",
//               `You earned ₹${commissionAmount} from a referral's purchase!`,
//               "success",
//               "/wallet"
//             );
//           }
//         }
//       } catch (commissionError) {
//         console.error("Commission calculation failed:", commissionError);
//       }

//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: 'Order not found' });
//     }
//   } catch (error) {
//     console.error("Payment Simulation Error:", error);
//     res.status(500).json({ message: 'Server error during payment simulation' });
//   }
// };

// // 3. Fetch orders for a specific user
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching your orders' });
//   }
// };

// // 4. ADMIN: Get all orders across the whole platform
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Admin Fetch Orders Error:", error);
//     res.status(500).json({ message: 'Error fetching all orders' });
//   }
// };

// // 5. ADMIN: Update Order Status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });
    
//     order.status = req.body.status;
//     await order.save();
    
//     await createNotification(
//       order.user,
//       "Order Status Updated",
//       `Your order #${order._id.toString().slice(-6).toUpperCase()} is now marked as: ${req.body.status}.`,
//       "alert",
//       "/orders"
//     );
//     res.status(200).json({ message: 'Order status updated successfully', order });
//   } catch (error) {
//     console.error("Update Status Error:", error);
//     res.status(500).json({ message: 'Error updating order status' });
//   }
// };

// exports.uploadInvoice = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     order.invoiceUrl = req.file.path.replace(/\\/g, "/"); 
//     await order.save();

//     await createNotification(
//       order.user,
//       "Invoice Uploaded",
//       `The invoice for your order #${order._id.toString().slice(-6).toUpperCase()} is now available.`,
//       "invoice",
//       "/orders"
//     );

//     res.status(200).json({ message: 'Invoice uploaded successfully', invoiceUrl: order.invoiceUrl });
//   } catch (error) {
//     console.error("Upload Invoice Error:", error);
//     res.status(500).json({ message: 'Error uploading invoice', error: error.message });
//   }
// };

// // 6. SECURE ORDER CANCELLATION
// exports.cancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('orderItems.product');
    
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     if (order.status === 'Shipped' || order.status === 'Delivered' || order.status === 'Cancelled') {
//       return res.status(400).json({ message: `Cannot cancel an order that is: ${order.status}` });
//     }

//     const primaryProduct = order.orderItems[0].product;

//     if (primaryProduct && primaryProduct.isCancellable === false) {
//       return res.status(400).json({ message: 'This item is non-cancellable.' });
//     }

//     const orderTime = new Date(order.createdAt).getTime();
//     const hoursPassed = (Date.now() - orderTime) / (1000 * 60 * 60);
//     const allowedWindow = primaryProduct?.cancellationWindowHours !== undefined ? primaryProduct.cancellationWindowHours : 24;

//     if (hoursPassed > allowedWindow) {
//       return res.status(400).json({ message: `The cancellation window has passed.` });
//     }

//     order.status = 'Cancelled';
//     await order.save();

//     await createNotification(
//       order.user,
//       "Order Cancelled",
//       `Your order #${order._id.toString().slice(-6).toUpperCase()} was successfully cancelled.`,
//       "cancel",
//       "/orders"
//     );

//     res.status(200).json({ message: 'Order cancelled successfully', order });
//   } catch (error) {
//     console.error("Cancel Order Error:", error);
//     res.status(500).json({ message: 'Server error processing cancellation' });
//   }
// };

// // controllers/orderController.js
// const Order = require('../models/Order');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');
// const Product = require('../models/Product');
// const { createNotification } = require('./notificationController');
// const sendEmail = require('../utils/sendEmail'); 

// // 🚀 UNIFIED BRANDED EMAIL TEMPLATE (Consistent Colors: Navy & Gold)
// const getBrandedEmailTemplate = (order, statusTitle, statusMessage, itemsTableHtml = "") => {
//   const brandColor = "#232f3e"; // Constant Amazon Navy
//   const accentColor = "#febd69"; // Constant Amazon Gold
//   const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; background-color: #fff;">
//       <div style="background-color: ${brandColor}; padding: 20px; text-align: center;">
//         <h1 style="color: ${accentColor}; margin: 0; font-size: 26px; letter-spacing: -1px;">amazon<span style="color: #fff; font-weight: bold;">smarts</span></h1>
//       </div>
      
//       <div style="padding: 30px; line-height: 1.6;">
//         <h2 style="color: #111; font-size: 20px; margin-top: 0; border-bottom: 2px solid ${accentColor}; padding-bottom: 10px; display: inline-block;">${statusTitle}</h2>
//         <p style="font-size: 15px; color: #333; margin-top: 20px;">${statusMessage}</p>
        
//         <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border: 1px solid #eee; border-radius: 4px;">
//            <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; font-weight: bold;">Order ID</p>
//            <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #111;">#${order._id.toString().toUpperCase()}</p>
//         </div>

//         ${itemsTableHtml}

//         <div style="text-align: center; margin-top: 30px;">
//           <a href="${frontendUrl}/orders" style="background-color: #FFD814; border: 1px solid #FCD200; color: #111; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">View Your Order</a>
//         </div>
//       </div>

//       <div style="background-color: #f0f2f2; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd;">
//         <p style="margin: 0 0 10px 0;">This email was sent from a notification-only address. Please do not reply to this message.</p>
//         <p style="margin: 0;">© ${new Date().getFullYear()} AmazonSmarts.com, Inc. or its affiliates</p>
//       </div>
//     </div>
//   `;
// };

// // 1. Create Order
// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;
//     if (orderItems && orderItems.length === 0) return res.status(400).json({ message: 'No items' });

//     const order = new Order({
//       user: userId, 
//       orderItems, 
//       shippingAddress,
//       itemsPrice: itemsPrice || totalPrice,
//       shippingPrice: shippingPrice || 0,
//       totalPrice,
//       status: 'Processing' 
//     });
    
//     const createdOrder = await order.save();

//     // Create Items Summary Table
//     const itemsHtml = `
//       <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
//         <tr style="background-color: #f3f3f3;"><th style="padding: 10px; text-align: left;">Item</th><th style="padding: 10px; text-align: right;">Total</th></tr>
//         ${orderItems.map(item => `
//           <tr>
//             <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} <strong>(x${item.quantity || 1})</strong></td>
//             <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
//           </tr>
//         `).join('')}
//         <tr><td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; color: #B12704;">Grand Total: ₹${totalPrice.toLocaleString('en-IN')}</td></tr>
//       </table>
//     `;

//     const email = getBrandedEmailTemplate(
//       createdOrder, 
//       "Order Confirmed", 
//       "Thank you for your purchase! We've received your order and are getting it ready. You'll receive another update when your items ship.",
//       itemsHtml
//     );

//     try {
//       await sendEmail({ email: shippingAddress.email, subject: `Confirmed: Amazon Smarts Order #${createdOrder._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     res.status(201).json({ message: 'Order created', order: createdOrder });
//   } catch (error) { res.status(500).json({ message: 'Error', error: error.message }); }
// };

// // 2. Simulate Payment Success & Affiliate Logic
// exports.simulatePayment = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       const updatedOrder = await order.save();
      
//       try {
//         const buyingUser = await User.findById(order.user);
//         if (buyingUser && buyingUser.referredBy) {
//           const referrer = await User.findById(buyingUser.referredBy);
//           if (referrer) {
//             const commissionAmount = Math.round((order.itemsPrice || order.totalPrice) * 0.05);
//             referrer.wallet.availableBalance += commissionAmount;
//             referrer.wallet.totalEarnings += commissionAmount;
//             await referrer.save();
//             await WalletTransaction.create({ userId: referrer._id, amount: commissionAmount, type: 'credit', source: 'referral_commission', status: 'completed', relatedOrderId: order._id });
//             await createNotification(referrer._id, "Commission Received! 💰", `You earned ₹${commissionAmount} from a referral!`, "success", "/wallet");
//           }
//         }
//       } catch (err) { console.error("Commission Error:", err); }
//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: 'Order not found' });
//     }
//   } catch (error) { res.status(500).json({ message: 'Payment simulation error' }); }
// };

// // 3. ADMIN: Update Status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
    
//     order.status = req.body.status;
//     await order.save();

//     let msg = `Your order status has been updated to ${order.status}.`;
//     if(order.status === 'Shipped') msg = "Great news! Your package is on its way. Use the button below to track its progress.";
//     if(order.status === 'Delivered') msg = "Your package has been delivered! We hope you love your new gadget.";

//     const email = getBrandedEmailTemplate(order, `Order Update: ${order.status}`, msg);

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Update: Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}`, message: email });
//     } catch (err) { console.log("Email failed"); }
    
//     await createNotification(order.user, "Order Updated", `Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}.`, "alert", "/orders");
//     res.status(200).json({ message: 'Updated', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 4. Cancel Order
// exports.cancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });

//     order.status = 'Cancelled';
//     await order.save();

//     const email = getBrandedEmailTemplate(
//       order, 
//       "Order Cancelled", 
//       "Your order has been successfully cancelled. If you have already been charged, a refund will be processed to your original payment method within 5-7 business days."
//     );

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Cancelled: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     await createNotification(order.user, "Order Cancelled", `Order #${order._id.toString().slice(-6).toUpperCase()} cancelled.`, "cancel", "/orders");
//     res.status(200).json({ message: 'Cancelled', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 5. Fetching & Invoice Logic
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { res.status(500).json({ message: 'Error fetching orders' }); }
// };

// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// exports.uploadInvoice = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
//     if (!req.file) return res.status(400).json({ message: 'No file' });

//     order.invoiceUrl = req.file.path.replace(/\\/g, "/"); 
//     await order.save();

//     const email = getBrandedEmailTemplate(order, "Invoice Available", "The invoice for your recent order is now available for download. You can find it in your order history.");

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Invoice Ready: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     await createNotification(order.user, "Invoice Uploaded", `Invoice for #${order._id.toString().slice(-6).toUpperCase()} is ready.`, "invoice", "/orders");
//     res.status(200).json({ message: 'Invoice uploaded', invoiceUrl: order.invoiceUrl });
//   } catch (error) { res.status(500).json({ message: 'Invoice error' }); }
// };

// // controllers/orderController.js
// const Order = require('../models/Order');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');
// const Product = require('../models/Product');
// const { createNotification } = require('./notificationController');
// const sendEmail = require('../utils/sendEmail'); 

// // 🚀 UNIFIED BRANDED EMAIL TEMPLATE (Consistent Colors: Navy & Gold)
// const getBrandedEmailTemplate = (order, statusTitle, statusMessage, itemsTableHtml = "") => {
//   const brandColor = "#232f3e"; // Constant Amazon Navy
//   const accentColor = "#febd69"; // Constant Amazon Gold
//   const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; background-color: #fff;">
//       <div style="background-color: ${brandColor}; padding: 20px; text-align: center;">
//         <h1 style="color: ${accentColor}; margin: 0; font-size: 26px; letter-spacing: -1px;">amazon<span style="color: #fff; font-weight: bold;">smarts</span></h1>
//       </div>
      
//       <div style="padding: 30px; line-height: 1.6;">
//         <h2 style="color: #111; font-size: 20px; margin-top: 0; border-bottom: 2px solid ${accentColor}; padding-bottom: 10px; display: inline-block;">${statusTitle}</h2>
//         <p style="font-size: 15px; color: #333; margin-top: 20px;">${statusMessage}</p>
        
//         <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border: 1px solid #eee; border-radius: 4px;">
//            <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; font-weight: bold;">Order ID</p>
//            <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #111;">#${order._id.toString().toUpperCase()}</p>
//         </div>

//         ${itemsTableHtml}

//         <div style="text-align: center; margin-top: 30px;">
//           <a href="${frontendUrl}/orders" style="background-color: #FFD814; border: 1px solid #FCD200; color: #111; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">View Your Order</a>
//         </div>
//       </div>

//       <div style="background-color: #f0f2f2; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd;">
//         <p style="margin: 0 0 10px 0;">This email was sent from a notification-only address. Please do not reply to this message.</p>
//         <p style="margin: 0;">© ${new Date().getFullYear()} AmazonSmarts.com, Inc. or its affiliates</p>
//       </div>
//     </div>
//   `;
// };

// // 1. Create Order
// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;
//     if (orderItems && orderItems.length === 0) return res.status(400).json({ message: 'No items' });

//     const order = new Order({
//       user: userId, 
//       orderItems, 
//       shippingAddress,
//       itemsPrice: itemsPrice || totalPrice,
//       shippingPrice: shippingPrice || 0,
//       totalPrice,
//       status: 'Processing' 
//     });
    
//     const createdOrder = await order.save();

//     // Create Items Summary Table
//     const itemsHtml = `
//       <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
//         <tr style="background-color: #f3f3f3;"><th style="padding: 10px; text-align: left;">Item</th><th style="padding: 10px; text-align: right;">Total</th></tr>
//         ${orderItems.map(item => `
//           <tr>
//             <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} <strong>(x${item.quantity || 1})</strong></td>
//             <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
//           </tr>
//         `).join('')}
//         <tr><td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; color: #B12704;">Grand Total: ₹${totalPrice.toLocaleString('en-IN')}</td></tr>
//       </table>
//     `;

//     const email = getBrandedEmailTemplate(
//       createdOrder, 
//       "Order Confirmed", 
//       "Thank you for your purchase! We've received your order and are getting it ready. You'll receive another update when your items ship.",
//       itemsHtml
//     );

//     try {
//       await sendEmail({ email: shippingAddress.email, subject: `Confirmed: Amazon Smarts Order #${createdOrder._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     res.status(201).json({ message: 'Order created', order: createdOrder });
//   } catch (error) { res.status(500).json({ message: 'Error', error: error.message }); }
// };

// // 2. Simulate Payment Success & Affiliate Logic
// exports.simulatePayment = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       const updatedOrder = await order.save();
      
//       try {
//         const buyingUser = await User.findById(order.user);
//         if (buyingUser && buyingUser.referredBy) {
//           const referrer = await User.findById(buyingUser.referredBy);
//           if (referrer) {
//             const commissionAmount = Math.round((order.itemsPrice || order.totalPrice) * 0.05);
//             referrer.wallet.availableBalance += commissionAmount;
//             referrer.wallet.totalEarnings += commissionAmount;
//             await referrer.save();
//             await WalletTransaction.create({ userId: referrer._id, amount: commissionAmount, type: 'credit', source: 'referral_commission', status: 'completed', relatedOrderId: order._id });
//             await createNotification(referrer._id, "Commission Received! 💰", `You earned ₹${commissionAmount} from a referral!`, "success", "/wallet");
//           }
//         }
//       } catch (err) { console.error("Commission Error:", err); }
//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: 'Order not found' });
//     }
//   } catch (error) { res.status(500).json({ message: 'Payment simulation error' }); }
// };

// // 3. ADMIN: Update Status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
    
//     order.status = req.body.status;
//     await order.save();

//     let msg = `Your order status has been updated to ${order.status}.`;
//     if(order.status === 'Shipped') msg = "Great news! Your package is on its way. Use the button below to track its progress.";
//     if(order.status === 'Delivered') msg = "Your package has been delivered! We hope you love your new gadget.";

//     const email = getBrandedEmailTemplate(order, `Order Update: ${order.status}`, msg);

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Update: Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}`, message: email });
//     } catch (err) { console.log("Email failed"); }
    
//     await createNotification(order.user, "Order Updated", `Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}.`, "alert", "/orders");
//     res.status(200).json({ message: 'Updated', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 4. Cancel Order
// exports.cancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });

//     // Prevent cancellation if already shipped
//     if (order.status === 'Shipped' || order.status === 'Delivered') {
//       return res.status(400).json({ message: 'Orders that have already been shipped cannot be cancelled.' });
//     }

//     order.status = 'Cancelled';
//     await order.save();

//     const email = getBrandedEmailTemplate(
//       order, 
//       "Order Cancelled", 
//       "Your order has been successfully cancelled. If you have already been charged, a refund will be processed to your original payment method within 5-7 business days."
//     );

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Cancelled: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     await createNotification(order.user, "Order Cancelled", `Order #${order._id.toString().slice(-6).toUpperCase()} cancelled.`, "cancel", "/orders");
//     res.status(200).json({ message: 'Cancelled', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 5. Fetching & Invoice Logic
// exports.getUserOrders = async (req, res) => {
//   try {
//     // 🚀 ADDED POPULATE HERE SO FRONTEND CAN READ PRODUCT SETTINGS (like isCancellable)
//     const orders = await Order.find({ user: req.params.userId })
//                               .populate('orderItems.product') 
//                               .sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { 
//     res.status(500).json({ message: 'Error fetching orders' }); 
//   }
// };

// exports.getAllOrders = async (req, res) => {
//   try {
//     // 🚀 POPULATE ALSO ADDED HERE FOR THE ADMIN PANEL
//     const orders = await Order.find({})
//                               .populate('user', 'name email')
//                               .populate('orderItems.product')
//                               .sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { 
//     res.status(500).json({ message: 'Error' }); 
//   }
// };

// exports.uploadInvoice = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
//     if (!req.file) return res.status(400).json({ message: 'No file' });

//     order.invoiceUrl = req.file.path.replace(/\\/g, "/"); 
//     await order.save();

//     const email = getBrandedEmailTemplate(order, "Invoice Available", "The invoice for your recent order is now available for download. You can find it in your order history.");

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Invoice Ready: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     await createNotification(order.user, "Invoice Uploaded", `Invoice for #${order._id.toString().slice(-6).toUpperCase()} is ready.`, "invoice", "/orders");
//     res.status(200).json({ message: 'Invoice uploaded', invoiceUrl: order.invoiceUrl });
//   } catch (error) { res.status(500).json({ message: 'Invoice error' }); }
// };

// // controllers/orderController.js
// const Order = require('../models/Order');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');
// const Product = require('../models/Product');
// const { createNotification } = require('./notificationController');
// const sendEmail = require('../utils/sendEmail'); 

// // 🚀 UNIFIED BRANDED EMAIL TEMPLATE (Consistent Colors: Navy & Gold)
// const getBrandedEmailTemplate = (order, statusTitle, statusMessage, itemsTableHtml = "") => {
//   const brandColor = "#232f3e"; // Constant Amazon Navy
//   const accentColor = "#febd69"; // Constant Amazon Gold
//   const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; background-color: #fff;">
//       <div style="background-color: ${brandColor}; padding: 20px; text-align: center;">
//         <h1 style="color: ${accentColor}; margin: 0; font-size: 26px; letter-spacing: -1px;">amazon<span style="color: #fff; font-weight: bold;">smarts</span></h1>
//       </div>
      
//       <div style="padding: 30px; line-height: 1.6;">
//         <h2 style="color: #111; font-size: 20px; margin-top: 0; border-bottom: 2px solid ${accentColor}; padding-bottom: 10px; display: inline-block;">${statusTitle}</h2>
//         <p style="font-size: 15px; color: #333; margin-top: 20px;">${statusMessage}</p>
        
//         <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border: 1px solid #eee; border-radius: 4px;">
//            <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; font-weight: bold;">Order ID</p>
//            <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #111;">#${order._id.toString().toUpperCase()}</p>
//         </div>

//         ${itemsTableHtml}

//         <div style="text-align: center; margin-top: 30px;">
//           <a href="${frontendUrl}/orders" style="background-color: #FFD814; border: 1px solid #FCD200; color: #111; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">View Your Order</a>
//         </div>
//       </div>

//       <div style="background-color: #f0f2f2; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd;">
//         <p style="margin: 0 0 10px 0;">This email was sent from a notification-only address. Please do not reply to this message.</p>
//         <p style="margin: 0;">© ${new Date().getFullYear()} AmazonSmarts.com, Inc. or its affiliates</p>
//       </div>
//     </div>
//   `;
// };

// // 1. Create Order
// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;
//     if (orderItems && orderItems.length === 0) return res.status(400).json({ message: 'No items' });

//     const order = new Order({
//       user: userId, 
//       orderItems, 
//       shippingAddress,
//       itemsPrice: itemsPrice || totalPrice,
//       shippingPrice: shippingPrice || 0,
//       totalPrice,
//       status: 'Processing' 
//     });
    
//     const createdOrder = await order.save();

//     // Create Items Summary Table
//     const itemsHtml = `
//       <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
//         <tr style="background-color: #f3f3f3;"><th style="padding: 10px; text-align: left;">Item</th><th style="padding: 10px; text-align: right;">Total</th></tr>
//         ${orderItems.map(item => `
//           <tr>
//             <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} <strong>(x${item.quantity || 1})</strong></td>
//             <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
//           </tr>
//         `).join('')}
//         <tr><td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; color: #B12704;">Grand Total: ₹${totalPrice.toLocaleString('en-IN')}</td></tr>
//       </table>
//     `;

//     const email = getBrandedEmailTemplate(
//       createdOrder, 
//       "Order Confirmed", 
//       "Thank you for your purchase! We've received your order and are getting it ready. You'll receive another update when your items ship.",
//       itemsHtml
//     );

//     try {
//       await sendEmail({ email: shippingAddress.email, subject: `Confirmed: Amazon Smarts Order #${createdOrder._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     res.status(201).json({ message: 'Order created', order: createdOrder });
//   } catch (error) { res.status(500).json({ message: 'Error', error: error.message }); }
// };

// // 2. Simulate Payment Success & 🚀 DYNAMIC Affiliate Logic
// exports.simulatePayment = async (req, res) => {
//   try {
//     // 🚀 We MUST populate the product so we can read the affiliateCommission percentage
//     const order = await Order.findById(req.params.id).populate('orderItems.product');
    
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       const updatedOrder = await order.save();
      
//       try {
//         const buyingUser = await User.findById(order.user);
        
//         // If the buyer used an affiliate link...
//         if (buyingUser && buyingUser.referredBy) {
//           const referrer = await User.findById(buyingUser.referredBy);
//           if (referrer) {
            
//             // 🚀 DYNAMIC COMMISSION CALCULATION
//             let totalCommissionAmount = 0;
            
//             order.orderItems.forEach(item => {
//               // Check if the product has a commission set
//               if (item.product && item.product.affiliateCommission > 0) {
//                 const itemTotal = item.price * (item.quantity || 1);
//                 const itemCommission = itemTotal * (item.product.affiliateCommission / 100);
//                 totalCommissionAmount += itemCommission;
//               }
//             });

//             totalCommissionAmount = Math.round(totalCommissionAmount);

//             // Only process payout if there's actually a commission generated
//             if (totalCommissionAmount > 0) {
//               referrer.wallet.availableBalance += totalCommissionAmount;
//               referrer.wallet.totalEarnings += totalCommissionAmount;
//               await referrer.save();
              
//               await WalletTransaction.create({ 
//                 userId: referrer._id, 
//                 amount: totalCommissionAmount, 
//                 type: 'credit', 
//                 source: 'referral_commission', 
//                 status: 'completed', 
//                 relatedOrderId: order._id 
//               });
              
//               await createNotification(referrer._id, "Commission Received! 💰", `You earned ₹${totalCommissionAmount} from a referral!`, "success", "/wallet");
//             }
//           }
//         }
//       } catch (err) { console.error("Commission Error:", err); }
//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: 'Order not found' });
//     }
//   } catch (error) { res.status(500).json({ message: 'Payment simulation error' }); }
// };

// // 3. ADMIN: Update Status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
    
//     order.status = req.body.status;
//     await order.save();

//     let msg = `Your order status has been updated to ${order.status}.`;
//     if(order.status === 'Shipped') msg = "Great news! Your package is on its way. Use the button below to track its progress.";
//     if(order.status === 'Delivered') msg = "Your package has been delivered! We hope you love your new gadget.";

//     const email = getBrandedEmailTemplate(order, `Order Update: ${order.status}`, msg);

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Update: Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}`, message: email });
//     } catch (err) { console.log("Email failed"); }
    
//     await createNotification(order.user, "Order Updated", `Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}.`, "alert", "/orders");
//     res.status(200).json({ message: 'Updated', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 4. Cancel Order
// exports.cancelOrder = async (req, res) => {
//   try {
//     const { itemId } = req.body; 

//     // 🚀 POPULATE orderItems.product so we can verify isCancellable
//     const order = await Order.findById(req.params.id)
//       .populate('user', 'email')
//       .populate('orderItems.product');

//     if (!order) return res.status(404).json({ message: 'Not found' });

//     // Prevent cancellation if already shipped
//     if (order.status === 'Shipped' || order.status === 'Delivered') {
//       return res.status(400).json({ message: 'Orders that have already been shipped cannot be cancelled.' });
//     }

//     // 🚀 STRICT BACKEND CHECK: Verify if the product is actually cancellable
//     if (itemId) {
//       const itemToCancel = order.orderItems.find(i => i._id.toString() === itemId);
      
//       // If the product exists and explicitly has isCancellable set to false, BLOCK IT.
//       if (itemToCancel && itemToCancel.product && itemToCancel.product.isCancellable === false) {
//         return res.status(400).json({ message: 'This specific product is non-cancellable.' });
//       }
//     }

//     order.status = 'Cancelled';
//     await order.save();

//     const email = getBrandedEmailTemplate(
//       order, 
//       "Order Cancelled", 
//       "Your order has been successfully cancelled. If you have already been charged, a refund will be processed to your original payment method within 5-7 business days."
//     );

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Cancelled: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     await createNotification(order.user, "Order Cancelled", `Order #${order._id.toString().slice(-6).toUpperCase()} cancelled.`, "cancel", "/orders");
//     res.status(200).json({ message: 'Cancelled', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 5. Fetching & Invoice Logic
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId })
//                               .populate('orderItems.product') 
//                               .sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { 
//     res.status(500).json({ message: 'Error fetching orders' }); 
//   }
// };

// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({})
//                               .populate('user', 'name email')
//                               .populate('orderItems.product')
//                               .sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { 
//     res.status(500).json({ message: 'Error' }); 
//   }
// };

// exports.uploadInvoice = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
//     if (!req.file) return res.status(400).json({ message: 'No file' });

//     order.invoiceUrl = req.file.path.replace(/\\/g, "/"); 
//     await order.save();

//     const email = getBrandedEmailTemplate(order, "Invoice Available", "The invoice for your recent order is now available for download. You can find it in your order history.");

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Invoice Ready: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     await createNotification(order.user, "Invoice Uploaded", `Invoice for #${order._id.toString().slice(-6).toUpperCase()} is ready.`, "invoice", "/orders");
//     res.status(200).json({ message: 'Invoice uploaded', invoiceUrl: order.invoiceUrl });
//   } catch (error) { res.status(500).json({ message: 'Invoice error' }); }
// };


// // controllers/orderController.js
// const Order = require('../models/Order');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');
// const Product = require('../models/Product');
// const { createNotification } = require('./notificationController');
// const sendEmail = require('../utils/sendEmail'); 

// // 🚀 UNIFIED BRANDED EMAIL TEMPLATE (Consistent Colors: Navy & Gold)
// const getBrandedEmailTemplate = (order, statusTitle, statusMessage, itemsTableHtml = "") => {
//   const brandColor = "#232f3e"; 
//   const accentColor = "#febd69"; 
//   const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; background-color: #fff;">
//       <div style="background-color: ${brandColor}; padding: 20px; text-align: center;">
//         <h1 style="color: ${accentColor}; margin: 0; font-size: 26px; letter-spacing: -1px;">amazon<span style="color: #fff; font-weight: bold;">smarts</span></h1>
//       </div>
      
//       <div style="padding: 30px; line-height: 1.6;">
//         <h2 style="color: #111; font-size: 20px; margin-top: 0; border-bottom: 2px solid ${accentColor}; padding-bottom: 10px; display: inline-block;">${statusTitle}</h2>
//         <p style="font-size: 15px; color: #333; margin-top: 20px;">${statusMessage}</p>
        
//         <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border: 1px solid #eee; border-radius: 4px;">
//            <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; font-weight: bold;">Order ID</p>
//            <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #111;">#${order._id.toString().toUpperCase()}</p>
//         </div>

//         ${itemsTableHtml}

//         <div style="text-align: center; margin-top: 30px;">
//           <a href="${frontendUrl}/orders" style="background-color: #FFD814; border: 1px solid #FCD200; color: #111; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">View Your Order</a>
//         </div>
//       </div>

//       <div style="background-color: #f0f2f2; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd;">
//         <p style="margin: 0 0 10px 0;">This email was sent from a notification-only address. Please do not reply to this message.</p>
//         <p style="margin: 0;">© ${new Date().getFullYear()} AmazonSmarts.com, Inc. or its affiliates</p>
//       </div>
//     </div>
//   `;
// };

// // 1. Create Order
// exports.createOrder = async (req, res) => {
//   try {
//     // 🚀 FIXED: Now extracting ALL the new fields sent by the frontend
//     const { 
//       userId, 
//       orderItems, 
//       shippingAddress, 
//       paymentMethod, 
//       itemsPrice, 
//       shippingPrice, 
//       discountAmount, 
//       couponCode, 
//       totalPrice,
//       isPaid,
//       paidAt,
//       paymentResult
//     } = req.body;
    
//     if (orderItems && orderItems.length === 0) return res.status(400).json({ message: 'No items' });

//     // 🚀 FIXED: Saving the new fields to the database properly
//     const order = new Order({
//       user: userId, 
//       orderItems, 
//       shippingAddress,
//       paymentMethod: paymentMethod || 'Cash on Delivery', 
//       itemsPrice: itemsPrice || totalPrice,
//       shippingPrice: shippingPrice || 0,
//       discountAmount: discountAmount || 0,
//       couponCode: couponCode || null,
//       totalPrice,
//       isPaid: isPaid || false,
//       paidAt: paidAt || null,
//       paymentResult,
//       status: 'Processing' 
//     });
    
//     const createdOrder = await order.save();

//     let discountHtml = discountAmount > 0 
//       ? `<tr><td style="padding: 10px; text-align: right; color: #007600; font-weight: bold;">Discount applied:</td><td style="padding: 10px; text-align: right; color: #007600; font-weight: bold;">-₹${discountAmount.toLocaleString('en-IN')}</td></tr>`
//       : '';

//     const itemsHtml = `
//       <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
//         <tr style="background-color: #f3f3f3;"><th style="padding: 10px; text-align: left;">Item</th><th style="padding: 10px; text-align: right;">Total</th></tr>
//         ${orderItems.map(item => `
//           <tr>
//             <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} <strong>(x${item.quantity || 1})</strong></td>
//             <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
//           </tr>
//         `).join('')}
//         ${discountHtml}
//         <tr><td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; color: #B12704;">Grand Total: ₹${totalPrice.toLocaleString('en-IN')}</td></tr>
//       </table>
//     `;

//     const email = getBrandedEmailTemplate(
//       createdOrder, 
//       "Order Confirmed", 
//       "Thank you for your purchase! We've received your order and are getting it ready. You'll receive another update when your items ship.",
//       itemsHtml
//     );

//     try {
//       await sendEmail({ email: shippingAddress.email, subject: `Confirmed: Amazon Smarts Order #${createdOrder._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     res.status(201).json({ message: 'Order created', order: createdOrder });
//   } catch (error) { res.status(500).json({ message: 'Error', error: error.message }); }
// };

// // 2. Simulate Payment Success & CREATE PENDING COMMISSION 🚀
// exports.simulatePayment = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('orderItems.product');
    
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       const updatedOrder = await order.save();
      
//       try {
//         const buyingUser = await User.findById(order.user);
        
//         if (buyingUser && buyingUser.referredBy) {
//           const referrer = await User.findById(buyingUser.referredBy);
//           if (referrer) {
            
//             let totalCommissionAmount = 0;
//             order.orderItems.forEach(item => {
//               if (item.product && item.product.affiliateCommission > 0) {
//                 const itemTotal = item.price * (item.quantity || 1);
//                 const itemCommission = itemTotal * (item.product.affiliateCommission / 100);
//                 totalCommissionAmount += itemCommission;
//               }
//             });

//             totalCommissionAmount = Math.round(totalCommissionAmount);

//             // 🚀 ONLY CREATE A PENDING TRANSACTION (Do not add to wallet yet!)
//             if (totalCommissionAmount > 0) {
//               await WalletTransaction.create({ 
//                 userId: referrer._id, 
//                 amount: totalCommissionAmount, 
//                 type: 'credit', 
//                 source: 'referral_commission', 
//                 status: 'pending', // ⬅️ Stays pending until delivery
//                 relatedOrderId: order._id 
//               });
              
//               await createNotification(referrer._id, "Pending Commission ⏳", `A referral order was placed! ₹${totalCommissionAmount} will be credited to your wallet once the order is delivered.`, "info", "/wallet");
//             }
//           }
//         }
//       } catch (err) { console.error("Commission Error:", err); }
//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: 'Order not found' });
//     }
//   } catch (error) { res.status(500).json({ message: 'Payment simulation error' }); }
// };

// // 3. ADMIN: Update Status & UNLOCK COMMISSION ON DELIVERY 🚀
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
    
//     order.status = req.body.status;
//     await order.save();

//     // ====================================================
//     // 🚀 NEW: UNLOCK OR VOID PENDING COMMISSION
//     // ====================================================
//     if (order.status === 'Delivered') {
//       // Find any pending commission for this specific order
//       const pendingTx = await WalletTransaction.findOne({ relatedOrderId: order._id, status: 'pending', type: 'credit' });
      
//       if (pendingTx) {
//         pendingTx.status = 'completed'; // Mark it complete
//         await pendingTx.save();

//         const referrer = await User.findById(pendingTx.userId);
//         if (referrer) {
//           // NOW we actually give them the money
//           referrer.wallet.availableBalance += pendingTx.amount;
//           referrer.wallet.totalEarnings += pendingTx.amount;
//           await referrer.save();

//           await createNotification(referrer._id, "Commission Unlocked! 💰", `The order was delivered! ₹${pendingTx.amount} has been added to your withdrawable balance.`, "success", "/wallet");
//         }
//       }
//     } else if (order.status === 'Cancelled' || order.status === 'Returned') {
//       // If it gets cancelled/returned, void the pending commission so they can't get it
//       const pendingTx = await WalletTransaction.findOne({ relatedOrderId: order._id, status: 'pending', type: 'credit' });
//       if (pendingTx) {
//         pendingTx.status = 'cancelled';
//         await pendingTx.save();
//         await createNotification(pendingTx.userId, "Commission Voided ❌", `A referred order was cancelled. The pending ₹${pendingTx.amount} commission has been removed.`, "alert", "/wallet");
//       }
//     }
//     // ====================================================

//     let msg = `Your order status has been updated to ${order.status}.`;
//     if(order.status === 'Shipped') msg = "Great news! Your package is on its way. Use the button below to track its progress.";
//     if(order.status === 'Delivered') msg = "Your package has been delivered! We hope you love your new gadget.";

//     const email = getBrandedEmailTemplate(order, `Order Update: ${order.status}`, msg);

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Update: Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}`, message: email });
//     } catch (err) { console.log("Email failed"); }
    
//     await createNotification(order.user, "Order Updated", `Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}.`, "alert", "/orders");
//     res.status(200).json({ message: 'Updated', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 4. Cancel Order & VOID COMMISSION 🚀
// exports.cancelOrder = async (req, res) => {
//   try {
//     const { itemId } = req.body; 

//     const order = await Order.findById(req.params.id)
//       .populate('user', 'email')
//       .populate('orderItems.product');

//     if (!order) return res.status(404).json({ message: 'Not found' });

//     if (order.status === 'Shipped' || order.status === 'Delivered') {
//       return res.status(400).json({ message: 'Orders that have already been shipped cannot be cancelled.' });
//     }

//     if (itemId) {
//       const itemToCancel = order.orderItems.find(i => i._id.toString() === itemId);
//       if (itemToCancel && itemToCancel.product && itemToCancel.product.isCancellable === false) {
//         return res.status(400).json({ message: 'This specific product is non-cancellable.' });
//       }
//     }

//     order.status = 'Cancelled';
//     await order.save();

//     // 🚀 NEW: VOID PENDING COMMISSION IF CUSTOMER CANCELS
//     const pendingTx = await WalletTransaction.findOne({ relatedOrderId: order._id, status: 'pending', type: 'credit' });
//     if (pendingTx) {
//       pendingTx.status = 'cancelled';
//       await pendingTx.save();
//       await createNotification(pendingTx.userId, "Commission Voided ❌", `A referred order was cancelled by the customer. The pending ₹${pendingTx.amount} commission has been removed.`, "alert", "/wallet");
//     }

//     const email = getBrandedEmailTemplate(
//       order, 
//       "Order Cancelled", 
//       "Your order has been successfully cancelled. If you have already been charged, a refund will be processed to your original payment method within 5-7 business days."
//     );

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Cancelled: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     await createNotification(order.user, "Order Cancelled", `Order #${order._id.toString().slice(-6).toUpperCase()} cancelled.`, "cancel", "/orders");
//     res.status(200).json({ message: 'Cancelled', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 5. Fetching & Invoice Logic
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId })
//                               .populate('orderItems.product') 
//                               .sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { 
//     res.status(500).json({ message: 'Error fetching orders' }); 
//   }
// };

// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({})
//                               .populate('user', 'name email')
//                               .populate('orderItems.product')
//                               .sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { 
//     res.status(500).json({ message: 'Error' }); 
//   }
// };

// exports.uploadInvoice = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
//     if (!req.file) return res.status(400).json({ message: 'No file' });

//     order.invoiceUrl = req.file.path.replace(/\\/g, "/"); 
//     await order.save();

//     const email = getBrandedEmailTemplate(order, "Invoice Available", "The invoice for your recent order is now available for download. You can find it in your order history.");

//     try {
//       await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Invoice Ready: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email });
//     } catch (err) { console.log("Email failed"); }

//     await createNotification(order.user, "Invoice Uploaded", `Invoice for #${order._id.toString().slice(-6).toUpperCase()} is ready.`, "invoice", "/orders");
//     res.status(200).json({ message: 'Invoice uploaded', invoiceUrl: order.invoiceUrl });
//   } catch (error) { res.status(500).json({ message: 'Invoice error' }); }
// };




// // controllers/orderController.js
// const axios = require('axios'); // 🚀 REQUIRED FOR SHIPROCKET API
// const Order = require('../models/Order');
// const User = require('../models/User');
// const WalletTransaction = require('../models/WalletTransaction');
// const Product = require('../models/Product');
// const { createNotification } = require('./notificationController');
// const sendEmail = require('../utils/sendEmail'); 

// // 🚀 UNIFIED BRANDED EMAIL TEMPLATE (Consistent Colors: Navy & Gold)
// const getBrandedEmailTemplate = (order, statusTitle, statusMessage, itemsTableHtml = "") => {
//   const brandColor = "#232f3e"; 
//   const accentColor = "#febd69"; 
//   const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; background-color: #fff;">
//       <div style="background-color: ${brandColor}; padding: 20px; text-align: center;">
//         <h1 style="color: ${accentColor}; margin: 0; font-size: 26px; letter-spacing: -1px;">amazon<span style="color: #fff; font-weight: bold;">smarts</span></h1>
//       </div>
      
//       <div style="padding: 30px; line-height: 1.6;">
//         <h2 style="color: #111; font-size: 20px; margin-top: 0; border-bottom: 2px solid ${accentColor}; padding-bottom: 10px; display: inline-block;">${statusTitle}</h2>
//         <p style="font-size: 15px; color: #333; margin-top: 20px;">${statusMessage}</p>
        
//         <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border: 1px solid #eee; border-radius: 4px;">
//            <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; font-weight: bold;">Order ID</p>
//            <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #111;">#${order._id.toString().toUpperCase()}</p>
//         </div>

//         ${itemsTableHtml}

//         <div style="text-align: center; margin-top: 30px;">
//           <a href="${frontendUrl}/orders" style="background-color: #FFD814; border: 1px solid #FCD200; color: #111; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">View Your Order</a>
//         </div>
//       </div>

//       <div style="background-color: #f0f2f2; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd;">
//         <p style="margin: 0 0 10px 0;">This email was sent from a notification-only address. Please do not reply to this message.</p>
//         <p style="margin: 0;">© ${new Date().getFullYear()} AmazonSmarts.com, Inc. or its affiliates</p>
//       </div>
//     </div>
//   `;
// };

// // 1. Create Order
// exports.createOrder = async (req, res) => {
//   try {
//     const { 
//       userId, orderItems, shippingAddress, paymentMethod, itemsPrice, 
//       shippingPrice, discountAmount, couponCode, totalPrice, isPaid, paidAt, paymentResult
//     } = req.body;
    
//     if (orderItems && orderItems.length === 0) return res.status(400).json({ message: 'No items' });

//     const order = new Order({
//       user: userId, orderItems, shippingAddress,
//       paymentMethod: paymentMethod || 'Cash on Delivery', 
//       itemsPrice: itemsPrice || totalPrice,
//       shippingPrice: shippingPrice || 0,
//       discountAmount: discountAmount || 0,
//       couponCode: couponCode || null,
//       totalPrice, isPaid: isPaid || false, paidAt: paidAt || null, paymentResult, status: 'Processing' 
//     });
    
//     const createdOrder = await order.save();

//     let discountHtml = discountAmount > 0 
//       ? `<tr><td style="padding: 10px; text-align: right; color: #007600; font-weight: bold;">Discount applied:</td><td style="padding: 10px; text-align: right; color: #007600; font-weight: bold;">-₹${discountAmount.toLocaleString('en-IN')}</td></tr>` : '';

//     const itemsHtml = `
//       <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
//         <tr style="background-color: #f3f3f3;"><th style="padding: 10px; text-align: left;">Item</th><th style="padding: 10px; text-align: right;">Total</th></tr>
//         ${orderItems.map(item => `
//           <tr>
//             <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} <strong>(x${item.quantity || 1})</strong></td>
//             <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
//           </tr>
//         `).join('')}
//         ${discountHtml}
//         <tr><td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; color: #B12704;">Grand Total: ₹${totalPrice.toLocaleString('en-IN')}</td></tr>
//       </table>
//     `;

//     const email = getBrandedEmailTemplate(createdOrder, "Order Confirmed", "Thank you for your purchase! We've received your order and are getting it ready. You'll receive another update when your items ship.", itemsHtml);

//     try { await sendEmail({ email: shippingAddress.email, subject: `Confirmed: Amazon Smarts Order #${createdOrder._id.toString().slice(-6).toUpperCase()}`, message: email }); } catch (err) { console.log("Email failed"); }

//     res.status(201).json({ message: 'Order created', order: createdOrder });
//   } catch (error) { res.status(500).json({ message: 'Error', error: error.message }); }
// };

// // 2. Simulate Payment Success & CREATE PENDING COMMISSION
// exports.simulatePayment = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('orderItems.product');
//     if (order) {
//       order.isPaid = true; order.paidAt = Date.now();
//       const updatedOrder = await order.save();
//       try {
//         const buyingUser = await User.findById(order.user);
//         if (buyingUser && buyingUser.referredBy) {
//           const referrer = await User.findById(buyingUser.referredBy);
//           if (referrer) {
//             let totalCommissionAmount = 0;
//             order.orderItems.forEach(item => {
//               if (item.product && item.product.affiliateCommission > 0) {
//                 const itemTotal = item.price * (item.quantity || 1);
//                 totalCommissionAmount += itemTotal * (item.product.affiliateCommission / 100);
//               }
//             });
//             totalCommissionAmount = Math.round(totalCommissionAmount);

//             if (totalCommissionAmount > 0) {
//               await WalletTransaction.create({ userId: referrer._id, amount: totalCommissionAmount, type: 'credit', source: 'referral_commission', status: 'pending', relatedOrderId: order._id });
//               await createNotification(referrer._id, "Pending Commission ⏳", `A referral order was placed! ₹${totalCommissionAmount} will be credited to your wallet once the order is delivered.`, "info", "/wallet");
//             }
//           }
//         }
//       } catch (err) { console.error("Commission Error:", err); }
//       res.json(updatedOrder);
//     } else { res.status(404).json({ message: 'Order not found' }); }
//   } catch (error) { res.status(500).json({ message: 'Payment simulation error' }); }
// };

// // 3. ADMIN: Update Status & UNLOCK COMMISSION
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
//     order.status = req.body.status;
//     await order.save();

//     if (order.status === 'Delivered') {
//       const pendingTx = await WalletTransaction.findOne({ relatedOrderId: order._id, status: 'pending', type: 'credit' });
//       if (pendingTx) {
//         pendingTx.status = 'completed'; await pendingTx.save();
//         const referrer = await User.findById(pendingTx.userId);
//         if (referrer) {
//           referrer.wallet.availableBalance += pendingTx.amount; referrer.wallet.totalEarnings += pendingTx.amount; await referrer.save();
//           await createNotification(referrer._id, "Commission Unlocked! 💰", `The order was delivered! ₹${pendingTx.amount} has been added to your withdrawable balance.`, "success", "/wallet");
//         }
//       }
//     } else if (order.status === 'Cancelled' || order.status === 'Returned') {
//       const pendingTx = await WalletTransaction.findOne({ relatedOrderId: order._id, status: 'pending', type: 'credit' });
//       if (pendingTx) {
//         pendingTx.status = 'cancelled'; await pendingTx.save();
//         await createNotification(pendingTx.userId, "Commission Voided ❌", `A referred order was cancelled. The pending ₹${pendingTx.amount} commission has been removed.`, "alert", "/wallet");
//       }
//     }

//     let msg = `Your order status has been updated to ${order.status}.`;
//     if(order.status === 'Shipped') msg = "Great news! Your package is on its way. Use the button below to track its progress.";
//     if(order.status === 'Delivered') msg = "Your package has been delivered! We hope you love your new gadget.";

//     const email = getBrandedEmailTemplate(order, `Order Update: ${order.status}`, msg);
//     try { await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Update: Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}`, message: email }); } catch (err) { console.log("Email failed"); }
    
//     await createNotification(order.user, "Order Updated", `Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}.`, "alert", "/orders");
//     res.status(200).json({ message: 'Updated', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 4. Cancel Order
// exports.cancelOrder = async (req, res) => {
//   try {
//     const { itemId } = req.body; 
//     const order = await Order.findById(req.params.id).populate('user', 'email').populate('orderItems.product');
//     if (!order) return res.status(404).json({ message: 'Not found' });
//     if (order.status === 'Shipped' || order.status === 'Delivered') return res.status(400).json({ message: 'Orders that have already been shipped cannot be cancelled.' });

//     if (itemId) {
//       const itemToCancel = order.orderItems.find(i => i._id.toString() === itemId);
//       if (itemToCancel && itemToCancel.product && itemToCancel.product.isCancellable === false) return res.status(400).json({ message: 'This specific product is non-cancellable.' });
//     }

//     order.status = 'Cancelled'; await order.save();

//     const pendingTx = await WalletTransaction.findOne({ relatedOrderId: order._id, status: 'pending', type: 'credit' });
//     if (pendingTx) {
//       pendingTx.status = 'cancelled'; await pendingTx.save();
//       await createNotification(pendingTx.userId, "Commission Voided ❌", `A referred order was cancelled by the customer. The pending ₹${pendingTx.amount} commission has been removed.`, "alert", "/wallet");
//     }

//     const email = getBrandedEmailTemplate(order, "Order Cancelled", "Your order has been successfully cancelled. If you have already been charged, a refund will be processed to your original payment method within 5-7 business days.");
//     try { await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Cancelled: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email }); } catch (err) { console.log("Email failed"); }

//     await createNotification(order.user, "Order Cancelled", `Order #${order._id.toString().slice(-6).toUpperCase()} cancelled.`, "cancel", "/orders");
//     res.status(200).json({ message: 'Cancelled', order });
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// // 5. Fetching & Invoice
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId }).populate('orderItems.product').sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { res.status(500).json({ message: 'Error fetching orders' }); }
// };

// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate('user', 'name email').populate('orderItems.product').sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) { res.status(500).json({ message: 'Error' }); }
// };

// exports.uploadInvoice = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Not found' });
//     if (!req.file) return res.status(400).json({ message: 'No file' });

//     order.invoiceUrl = req.file.path.replace(/\\/g, "/"); await order.save();
//     const email = getBrandedEmailTemplate(order, "Invoice Available", "The invoice for your recent order is now available for download. You can find it in your order history.");
//     try { await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Invoice Ready: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email }); } catch (err) { console.log("Email failed"); }
//     await createNotification(order.user, "Invoice Uploaded", `Invoice for #${order._id.toString().slice(-6).toUpperCase()} is ready.`, "invoice", "/orders");
//     res.status(200).json({ message: 'Invoice uploaded', invoiceUrl: order.invoiceUrl });
//   } catch (error) { res.status(500).json({ message: 'Invoice error' }); }
// };

// // ==========================================
// // 🚀 6. MANUAL FULFILLMENT
// // ==========================================
// exports.fulfillManual = async (req, res) => {
//   try {
//     const { carrierName, trackingId } = req.body;
//     const order = await Order.findById(req.params.id).populate('user', 'email');
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     order.shippingDetails = { provider: 'Manual', carrierName: carrierName || 'Standard Courier', trackingId: trackingId };
//     order.status = 'Shipped';
//     await order.save();

//     const email = getBrandedEmailTemplate(order, "Your Order Has Shipped!", `Great news! Your order has been handed over to ${carrierName || 'our courier partner'}. Your tracking number is: <br/><br/><b style="font-size:20px; color:#007185;">${trackingId}</b>.`);
//     try { await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Shipped: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email }); } catch (err) { console.log("Email failed"); }

//     res.status(200).json({ message: 'Order fulfilled manually', order });
//   } catch (error) { res.status(500).json({ message: 'Error fulfilling order manually', error: error.message }); }
// };

// // ==========================================
// // 🚀 7. AUTOMATED SHIPROCKET FULFILLMENT
// // ==========================================
// exports.fulfillShiprocket = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user', 'email').populate('orderItems.product');
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     // A. Authenticate with Shiprocket
//     const authRes = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', { email: process.env.SHIPROCKET_EMAIL, password: process.env.SHIPROCKET_PASSWORD });
//     const token = authRes.data.token;

//     // B. Map our Order to Shiprocket's format
//     const srPayload = {
//       order_id: order._id.toString() + "-" + Date.now().toString().slice(-4), // Add timestamp to prevent duplicate ID errors on retries
//       order_date: new Date(order.createdAt).toISOString().split('T')[0],
//       pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || "Primary",
//       billing_customer_name: order.shippingAddress.fullName,
//       billing_last_name: ".", // Fallback so Shiprocket doesn't reject missing last names
//       billing_address: order.shippingAddress.address,
//       billing_city: order.shippingAddress.city,
//       billing_pincode: order.shippingAddress.pincode,
//       billing_state: "Punjab", 
//       billing_country: "India",
//       billing_email: order.shippingAddress.email || order.user.email,
//       billing_phone: order.shippingAddress.phone,
//       shipping_is_billing: true,
//       order_items: order.orderItems.map(item => ({
//         name: item.name, sku: item.product?._id?.toString() || 'SKU-1', units: item.quantity || 1, selling_price: item.price, discount: 0, tax: 0, hsn: 441122
//       })),
//       payment_method: order.paymentMethod === 'Cash on Delivery' || order.paymentMethod === 'COD' ? 'COD' : 'Prepaid',
//       shipping_charges: order.shippingPrice || 0,
//       total_discount: order.discountAmount || 0,
//       sub_total: order.totalPrice,
//       length: 10, breadth: 10, height: 10, weight: 0.5 
//     };

//     // C. Create Order in Shiprocket
//     const createOrderRes = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', srPayload, { headers: { Authorization: `Bearer ${token}` } });
    
//     // Safely extract the IDs regardless of how Shiprocket formats the response
//     const srOrderId = createOrderRes.data.order_id;
//     const srShipmentId = createOrderRes.data.shipment_id;

//     if (!srOrderId && !srShipmentId) {
//         return res.status(500).json({ message: "Shiprocket did not return an Order ID.", details: createOrderRes.data });
//     }

//     // D. Generate AWB (Tracking Number)
//     // 🚀 FIXED: We now dynamically construct this to prevent "Missing Field" errors
//     const awbPayload = {};
//     if (srShipmentId) awbPayload.shipment_id = srShipmentId;
//     if (srOrderId) awbPayload.order_id = srOrderId;

//     const awbRes = await axios.post('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', awbPayload, { headers: { Authorization: `Bearer ${token}` } });
//     const awbData = awbRes.data.response.data;

//     // E. Save to Database
//     order.shippingDetails = { provider: 'Shiprocket', carrierName: awbData.courier_name, trackingId: awbData.awb_code, shiprocketOrderId: srOrderId, shiprocketShipmentId: srShipmentId };
//     order.status = 'Shipped';
//     await order.save();

//     // F. Email Customer with automated tracking
//     const email = getBrandedEmailTemplate(order, "Your Order Has Shipped!", `Good news! Your order has been automated via Shiprocket and handed to <b>${awbData.courier_name}</b>. Your AWB Tracking ID is: <br/><br/><b style="font-size:20px; color:#007185;">${awbData.awb_code}</b>.`);
//     try { await sendEmail({ email: order.shippingAddress.email || order.user.email, subject: `Shipped: Order #${order._id.toString().slice(-6).toUpperCase()}`, message: email }); } catch (err) { console.log("Email failed"); }

//     res.status(200).json({ message: 'Shiprocket automated successfully', order });
//   } catch (error) { 
//     // 🚀 NEW: Send the exact Shiprocket error back to the frontend so we can debug it
//     const shiprocketErrorMsg = error.response?.data?.message || JSON.stringify(error.response?.data?.errors) || error.message;
//     console.error("Shiprocket Detailed Error:", shiprocketErrorMsg);
    
//     res.status(500).json({ 
//       message: 'Shiprocket Error', 
//       details: shiprocketErrorMsg 
//     }); 
//   }
// };

// controllers/orderController.js
const axios = require('axios');
const Razorpay = require('razorpay'); // 🚀 ADDED RAZORPAY
const crypto = require('crypto');     // 🚀 ADDED CRYPTO
const Order = require('../models/Order');
const User = require('../models/User');
const WalletTransaction = require('../models/WalletTransaction');
const Product = require('../models/Product');
const { createNotification } = require('./notificationController');
const sendEmail = require('../utils/sendEmail'); 

const getBrandedEmailTemplate = (order, statusTitle, statusMessage, itemsTableHtml = "") => {
  const brandColor = "#232f3e"; const accentColor = "#febd69"; const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; background-color: #fff;">
      <div style="background-color: ${brandColor}; padding: 20px; text-align: center;"><h1 style="color: ${accentColor}; margin: 0; font-size: 26px; letter-spacing: -1px;">amazon<span style="color: #fff; font-weight: bold;">smarts</span></h1></div>
      <div style="padding: 30px; line-height: 1.6;">
        <h2 style="color: #111; font-size: 20px; margin-top: 0; border-bottom: 2px solid ${accentColor}; padding-bottom: 10px; display: inline-block;">${statusTitle}</h2>
        <p style="font-size: 15px; color: #333; margin-top: 20px;">${statusMessage}</p>
        <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border: 1px solid #eee; border-radius: 4px;"><p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; font-weight: bold;">Order ID</p><p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #111;">#${order._id.toString().toUpperCase()}</p></div>
        ${itemsTableHtml}
        <div style="text-align: center; margin-top: 30px;"><a href="${frontendUrl}/orders" style="background-color: #FFD814; border: 1px solid #FCD200; color: #111; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">View Your Order</a></div>
      </div>
      <div style="background-color: #f0f2f2; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd;"><p style="margin: 0 0 10px 0;">This email was sent from a notification-only address. Please do not reply to this message.</p><p style="margin: 0;">© ${new Date().getFullYear()} AmazonSmarts.com, Inc. or its affiliates</p></div>
    </div>
  `;
};

// 🚀 DUAL-EMAIL HELPER (Handles custom HTML for receipts and guest emails)
const sendStatusEmailsToBoth = async (order, statusTitle, statusMessage, customHtml = "", explicitEmail = null) => {
  let trackingHtml = "";
  if (order.shippingDetails?.trackingId) {
    trackingHtml = `
      <div style="margin-top: 20px; padding: 15px; border: 1px dashed #febd69; border-radius: 4px; background-color: #fffaf5;">
        <p style="margin: 0; font-size: 13px; color: #666;">TRACKING ID (${order.shippingDetails.provider})</p>
        <p style="margin: 5px 0; font-size: 18px; font-weight: bold; color: #007185;">${order.shippingDetails.trackingId}</p>
        <p style="margin: 0; font-size: 12px; color: #565959;">Carrier: ${order.shippingDetails.carrierName}</p>
      </div>
    `;
  }

  const finalHtml = customHtml + trackingHtml;
  const emailBody = getBrandedEmailTemplate(order, statusTitle, statusMessage, finalHtml);
  const subject = `${order.status}: Amazon Smarts Order #${order._id.toString().slice(-6).toUpperCase()}`;
  
  const customerEmail = explicitEmail || order.shippingAddress?.email || (order.user && order.user.email) || null;

  if (customerEmail) {
    try { await sendEmail({ email: customerEmail, subject, message: emailBody }); } catch (err) {}
  }

  try {
    const admins = await User.find({ role: 'admin' }).select('email');
    const adminEmails = admins.map(a => a.email).filter(e => e);
    const fallbackEmail = process.env.EMAIL_USER; 
    const finalEmails = adminEmails.length > 0 ? adminEmails : (fallbackEmail ? [fallbackEmail] : []);

    const adminBody = getBrandedEmailTemplate(order, `[ADMIN ALERT] Order ${order.status}`, `Customer (${customerEmail || 'Guest User'}) order status is now ${order.status}.`, finalHtml);
    
    for (const adminEmail of finalEmails) {
      await sendEmail({ email: adminEmail, subject: `[ADMIN] ${subject}`, message: adminBody });
    }
  } catch (err) {}
};

exports.createOrder = async (req, res) => {
  try {
    const { userId, user, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, discountAmount, couponCode, totalPrice, isPaid, paidAt, paymentResult } = req.body;

    if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: 'No order items provided' });

    let finalUserId = userId || user;
    const guestEmail = shippingAddress?.email || req.body.email;

    if (!finalUserId && guestEmail) {
      const existingUser = await User.findOne({ email: guestEmail });
      if (existingUser) {
        finalUserId = existingUser._id;
        if (existingUser.name === 'Guest Customer' && shippingAddress?.fullName) {
          existingUser.name = shippingAddress.fullName;
          await existingUser.save();
        }
      }
    }

    const orderData = {
      user: finalUserId || undefined, orderItems, shippingAddress: shippingAddress || {}, paymentMethod: paymentMethod || 'Cash on Delivery', itemsPrice: itemsPrice || totalPrice || 0, shippingPrice: shippingPrice || 0, discountAmount: discountAmount || 0, couponCode: couponCode || null, totalPrice: totalPrice || 0, isPaid: isPaid || false, paidAt: paidAt || null, paymentResult, status: 'Processing' 
    };

    const order = new Order(orderData);
    const createdOrder = await order.save();

    let discountHtml = discountAmount > 0 ? `<tr><td style="padding: 10px; text-align: right; color: #007600; font-weight: bold;">Discount applied:</td><td style="padding: 10px; text-align: right; color: #007600; font-weight: bold;">-₹${Number(discountAmount).toLocaleString('en-IN')}</td></tr>` : '';
      
    const itemsHtml = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
        <tr style="background-color: #f3f3f3;"><th style="padding: 10px; text-align: left;">Item</th><th style="padding: 10px; text-align: right;">Total</th></tr>
        ${orderItems.map(item => `<tr><td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name || 'Product'} <strong>(x${item.quantity || item.qty || 1})</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${Number(item.price || 0).toLocaleString('en-IN')}</td></tr>`).join('')}
        ${discountHtml}
        <tr><td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; color: #B12704;">Grand Total: ₹${Number(totalPrice || 0).toLocaleString('en-IN')}</td></tr>
      </table>
    `;

    const emailToSend = shippingAddress?.email || guestEmail;
    
    if (emailToSend) {
      console.log(`[EMAIL SYSTEM] Attempting to send Order Confirmation to: ${emailToSend}`);
      try { 
        await sendStatusEmailsToBoth(createdOrder, "Order Confirmed", "Thank you for your purchase! We've received your order and are getting it ready.", itemsHtml, emailToSend); 
        console.log(`[EMAIL SYSTEM] ✅ Successfully sent to ${emailToSend}`);
      } catch (err) {
        // 🚀 THIS IS THE MAGIC LOG THAT WILL TELL YOU WHAT IS BROKEN!
        console.error("🚨 [EMAIL SYSTEM] FAILED TO SEND! Error Details:", err.message || err); 
      }
    } else {
      console.log("🚨 [EMAIL SYSTEM] No email address found to send the confirmation to.");
    }

    res.status(201).json({ message: 'Order created successfully', order: createdOrder });
  } catch (error) { 
    console.error("BACKEND CREATE ORDER ERROR:", error);
    res.status(500).json({ message: 'Error saving order to database', error: error.message }); 
  }
};
// ==========================================
// 🚀 RAZORPAY CONTROLLERS ADDED HERE
// ==========================================
exports.createRazorpayOrder = async (req, res) => {
  try {
    // 🚀 Robust key detection to handle naming mismatches
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_SECRET || process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("CRITICAL ERROR: Razorpay keys are missing in the environment.");
      return res.status(500).json({ 
        message: "Payment configuration error on server. Please check environment variables." 
      });
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(Number(req.body.amount) * 100), // convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const rzpOrder = await instance.orders.create(options);
    
    console.log("✅ Razorpay Order Created Successfully:", rzpOrder.id);
    res.status(200).json(rzpOrder);
    
  } catch (error) {
    console.error("❌ Razorpay API Error:", error.message);
    res.status(500).json({ message: `Razorpay Error: ${error.message}` });
  }
};

exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error("Razorpay Verify Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.simulatePayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.product');
    if (order) {
      order.isPaid = true; order.paidAt = Date.now(); const updatedOrder = await order.save();
      if (order.user) {
        try {
          const buyingUser = await User.findById(order.user);
          if (buyingUser && buyingUser.referredBy) {
            const referrer = await User.findById(buyingUser.referredBy);
            if (referrer) {
              let totalCommissionAmount = 0;
              order.orderItems.forEach(item => { if (item.product && item.product.affiliateCommission > 0) { totalCommissionAmount += (item.price * (item.quantity || 1)) * (item.product.affiliateCommission / 100); } });
              totalCommissionAmount = Math.round(totalCommissionAmount);
              if (totalCommissionAmount > 0) {
                await WalletTransaction.create({ userId: referrer._id, amount: totalCommissionAmount, type: 'credit', source: 'referral_commission', status: 'pending', relatedOrderId: order._id });
                await createNotification(referrer._id, "Pending Commission ⏳", `A referral order was placed! ₹${totalCommissionAmount} will be credited upon delivery.`, "info", "/wallet");
              }
            }
          }
        } catch (err) { console.error("Commission Error:", err); }
      }
      res.json(updatedOrder);
    } else { res.status(404).json({ message: 'Order not found' }); }
  } catch (error) { res.status(500).json({ message: 'Payment error' }); }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'email');
    if (!order) return res.status(404).json({ message: 'Not found' });
    
    order.status = req.body.status;
    await order.save();

    if (order.status === 'Delivered') {
      const pendingTx = await WalletTransaction.findOne({ relatedOrderId: order._id, status: 'pending', type: 'credit' });
      if (pendingTx) {
        pendingTx.status = 'completed'; await pendingTx.save();
        const referrer = await User.findById(pendingTx.userId);
        if (referrer) {
          referrer.wallet.availableBalance += pendingTx.amount; referrer.wallet.totalEarnings += pendingTx.amount; await referrer.save();
          await createNotification(referrer._id, "Commission Unlocked! 💰", `Order delivered! ₹${pendingTx.amount} added.`, "success", "/wallet");
        }
      }
    }

    let statusMsg = `Your order status has been updated to ${order.status}.`;
    if(order.status === 'Processing') statusMsg = "We are currently preparing your items for dispatch.";
    if(order.status === 'Shipped') statusMsg = "Your package is on its way!";
    if(order.status === 'Delivered') statusMsg = "Your package has been delivered. Enjoy your purchase!";
    if(order.status === 'Cancelled') statusMsg = "Your order has been cancelled.";

    await sendStatusEmailsToBoth(order, `Order Update: ${order.status}`, statusMsg);
    
    if (order.user) {
      await createNotification(order.user._id || order.user, "Order Updated", `Order #${order._id.toString().slice(-6).toUpperCase()} is ${order.status}.`, "alert", "/orders");
    }

    res.status(200).json({ message: 'Updated', order });
  } catch (error) { res.status(500).json({ message: 'Error' }); }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'email');
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (order.status === 'Shipped' || order.status === 'Delivered') return res.status(400).json({ message: 'Shipped orders cannot be cancelled.' });

    order.status = 'Cancelled'; await order.save();

    if (order.shippingDetails?.provider === 'Shiprocket' && order.shippingDetails?.shiprocketOrderId) {
      try {
        const authRes = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', { email: process.env.SHIPROCKET_EMAIL, password: process.env.SHIPROCKET_PASSWORD });
        await axios.post('https://apiv2.shiprocket.in/v1/external/orders/cancel', { ids: [order.shippingDetails.shiprocketOrderId] }, { headers: { Authorization: `Bearer ${authRes.data.token}` } });
      } catch (srErr) {}
    }

    const pendingTx = await WalletTransaction.findOne({ relatedOrderId: order._id, status: 'pending', type: 'credit' });
    if (pendingTx) { pendingTx.status = 'cancelled'; await pendingTx.save(); }

    await sendStatusEmailsToBoth(order, "Order Cancelled", "Your order has been successfully cancelled.");
    res.status(200).json({ message: 'Cancelled', order });
  } catch (error) { res.status(500).json({ message: 'Error' }); }
};

exports.getUserOrders = async (req, res) => {
  try { const orders = await Order.find({ user: req.params.userId }).populate('orderItems.product').sort({ createdAt: -1 }); res.status(200).json(orders); } catch (error) { res.status(500).json({ message: 'Error' }); }
};

exports.getAllOrders = async (req, res) => {
  try { const orders = await Order.find({}).populate('user', 'name email').populate('orderItems.product').sort({ createdAt: -1 }); res.status(200).json(orders); } catch (error) { res.status(500).json({ message: 'Error' }); }
};

exports.uploadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'email');
    if (!order || !req.file) return res.status(400).json({ message: 'Error' });
    order.invoiceUrl = req.file.path.replace(/\\/g, "/"); await order.save();
    res.status(200).json({ message: 'Invoice uploaded', invoiceUrl: order.invoiceUrl });
  } catch (error) { res.status(500).json({ message: 'Error' }); }
};

exports.fulfillManual = async (req, res) => {
  try {
    const { carrierName, trackingId } = req.body;
    const order = await Order.findById(req.params.id).populate('user', 'email');
    order.shippingDetails = { provider: 'Manual', carrierName: carrierName || 'Courier', trackingId: trackingId };
    order.status = 'Shipped'; await order.save();

    await sendStatusEmailsToBoth(order, "Order Shipped!", `Your order shipped via ${carrierName}.`);
    
    if (order.user) {
      await createNotification(order.user._id || order.user, "Order Shipped!", `Your order is on the way via ${carrierName}.`, "info", "/orders");
    }
    
    res.status(200).json({ message: 'Fulfilled manually', order });
  } catch (error) { res.status(500).json({ message: 'Error', error: error.message }); }
};

exports.fulfillShiprocket = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'email').populate('orderItems.product');
    const authRes = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', { email: process.env.SHIPROCKET_EMAIL, password: process.env.SHIPROCKET_PASSWORD });
    const token = authRes.data.token;

    const srPayload = {
      order_id: order._id.toString() + "-" + Date.now().toString().slice(-4),
      order_date: new Date(order.createdAt).toISOString().split('T')[0],
      pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || "Primary",
      billing_customer_name: order.shippingAddress.fullName, billing_last_name: ".", billing_address: order.shippingAddress.address, billing_city: order.shippingAddress.city, billing_pincode: order.shippingAddress.pincode, billing_state: "Punjab", billing_country: "India", billing_email: order.shippingAddress.email || (order.user && order.user.email) || "guest@example.com", billing_phone: order.shippingAddress.phone, shipping_is_billing: true,
      order_items: order.orderItems.map(item => ({ name: item.name, sku: item.product?._id?.toString() || 'SKU-1', units: item.quantity || 1, selling_price: item.price, discount: 0, tax: 0, hsn: 441122 })),
      payment_method: order.paymentMethod === 'Cash on Delivery' || order.paymentMethod === 'COD' ? 'COD' : 'Prepaid',
      shipping_charges: order.shippingPrice || 0, total_discount: order.discountAmount || 0, sub_total: order.totalPrice, length: 10, breadth: 10, height: 10, weight: 0.5 
    };

    const createOrderRes = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', srPayload, { headers: { Authorization: `Bearer ${token}` } });
    const srOrderId = createOrderRes.data.order_id; const srShipmentId = createOrderRes.data.shipment_id;

    const awbPayload = {}; if (srShipmentId) awbPayload.shipment_id = srShipmentId; if (srOrderId) awbPayload.order_id = srOrderId;
    const awbRes = await axios.post('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', awbPayload, { headers: { Authorization: `Bearer ${token}` } });
    const awbData = awbRes.data.response.data;

    order.shippingDetails = { provider: 'Shiprocket', carrierName: awbData.courier_name, trackingId: awbData.awb_code, shiprocketOrderId: srOrderId, shiprocketShipmentId: srShipmentId };
    order.status = 'Shipped'; await order.save();

    await sendStatusEmailsToBoth(order, "Order Shipped!", `Your order shipped via <b>${awbData.courier_name}</b>.`);

    if (order.user) {
      await createNotification(order.user._id || order.user, "Order Shipped!", `Your order is shipped via ${awbData.courier_name}.`, "info", "/orders");
    }

    res.status(200).json({ message: 'Shiprocket automated successfully', order });
  } catch (error) { 
    const shiprocketErrorMsg = error.response?.data?.message || JSON.stringify(error.response?.data?.errors) || error.message;
    res.status(500).json({ message: 'Shiprocket Error', details: shiprocketErrorMsg }); 
  }
};

exports.getLiveTracking = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.shippingDetails?.provider === 'Shiprocket' && order.shippingDetails?.trackingId) {
      const authRes = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', { email: process.env.SHIPROCKET_EMAIL, password: process.env.SHIPROCKET_PASSWORD });
      const trackRes = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${order.shippingDetails.trackingId}`, { headers: { Authorization: `Bearer ${authRes.data.token}` } });
      
      let invoiceUrl = null;
      if(order.shippingDetails.shiprocketOrderId) {
         try {
           const invRes = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/print/invoice', { ids: [order.shippingDetails.shiprocketOrderId] }, { headers: { Authorization: `Bearer ${authRes.data.token}` } });
           invoiceUrl = invRes.data.invoice_url;
         } catch(e) {}
      }

      return res.status(200).json({ isLive: true, provider: 'Shiprocket', trackingData: trackRes.data.tracking_data, shiprocketInvoiceUrl: invoiceUrl });
    }

    return res.status(200).json({ isLive: false, status: order.status, provider: order.shippingDetails?.provider || 'Pending', carrierName: order.shippingDetails?.carrierName, trackingId: order.shippingDetails?.trackingId });
  } catch (error) { res.status(500).json({ message: 'Tracking Error', error: error.message }); }
};

// exports.handleShiprocketWebhook = async (req, res) => {
//   try {
//     const { awb, status } = req.body;
//     const order = await Order.findOne({ "shippingDetails.trackingId": awb }).populate('user', 'email');

//     if (!order) return res.status(404).json({ message: "Order not found for this AWB" });

//     let newStatus = order.status;
//     if (status === "shipped" || status == 6) newStatus = "Shipped";
//     if (status === "delivered" || status == 7) newStatus = "Delivered";
//     if (status === "canceled" || status == 10) newStatus = "Cancelled";

//     if (order.status !== newStatus) {
//       order.status = newStatus;
//       await order.save();
      
//       let statusMsg = `Your order status has been updated to ${newStatus}.`;
//       if(newStatus === 'Delivered') statusMsg = "Your package has been delivered. Enjoy your purchase!";
//       if(newStatus === 'Cancelled') statusMsg = "Your shipment was cancelled by the carrier.";

//       await sendStatusEmailsToBoth(order, `Order Update: ${newStatus}`, statusMsg);
      
//       if (order.user) {
//         await createNotification(order.user._id || order.user, "Delivery Update", `Your order is now ${newStatus}!`, "info", "/orders");
//       }
//     }

//     res.status(200).send("Webhook Received");
//   } catch (error) { res.status(500).send("Webhook Error"); }
// };
exports.handleShiprocketWebhook = async (req, res) => {
  try {
    // 🚀 Shiprocket sends various fields depending on the status
    const { awb, current_status, current_status_id, order_id, channel_order_id } = req.body;
    
    console.log("[SHIPROCKET WEBHOOK RECEIVED]:", current_status || "Unknown Status");

    // 1. Try to find the exact order in our database
    let order = null;
    
    if (awb) {
      order = await Order.findOne({ "shippingDetails.trackingId": awb }).populate('user', 'email');
    }
    if (!order && order_id) {
      order = await Order.findOne({ "shippingDetails.shiprocketOrderId": order_id }).populate('user', 'email');
    }
    if (!order && channel_order_id) {
       // We sent our MongoDB ID as part of the channel_order_id during creation
       const dbId = channel_order_id.split('-')[0];
       if (dbId.length === 24) {
          order = await Order.findById(dbId).populate('user', 'email');
       }
    }

    if (!order) {
       console.log("Webhook ignored: Could not match this Shiprocket order to our database.");
       return res.status(200).send("Order not found, but webhook received.");
    }

    let newStatus = order.status;
    const statusStr = (current_status || "").toLowerCase();
    const statusId = current_status_id || req.body.status;

    // 2. Map Shiprocket Statuses to Our Statuses
    if (statusStr === "shipped" || statusId == 6 || statusId == 17) newStatus = "Shipped";
    if (statusStr === "delivered" || statusId == 7) newStatus = "Delivered";
    // Status 15 is Cancelled in Shiprocket
    if (statusStr === "canceled" || statusStr === "cancelled" || statusId == 15) newStatus = "Cancelled";

    // 3. If Shiprocket changed the status, update our database!
    if (order.status !== newStatus) {
      order.status = newStatus;
      await order.save();
      
      let statusMsg = `Your order status has been updated to ${newStatus}.`;
      if(newStatus === 'Delivered') statusMsg = "Your package has been delivered. Enjoy your purchase!";
      if(newStatus === 'Cancelled') statusMsg = "Your order was cancelled. If you prepaid, your refund will be processed shortly.";

      // 🚀 If Shiprocket cancelled it, reverse the affiliate commission!
      if (newStatus === 'Cancelled') {
         const pendingTx = await WalletTransaction.findOne({ relatedOrderId: order._id, status: 'pending', type: 'credit' });
         if (pendingTx) { 
           pendingTx.status = 'cancelled'; 
           await pendingTx.save(); 
         }
      }

      // 4. Send Emails and In-App Notifications automatically!
      await sendStatusEmailsToBoth(order, `Order Update: ${newStatus}`, statusMsg);
      
      if (order.user) {
        await createNotification(order.user._id || order.user, "Delivery Update", `Your order is now ${newStatus}!`, "info", "/orders");
      }
      console.log(`[WEBHOOK SUCCESS] Order ${order._id} updated to ${newStatus}`);
    }

    res.status(200).send("Webhook Processed Successfully");
  } catch (error) { 
    console.error("Webhook Processing Error:", error);
    res.status(500).send("Webhook Error"); 
  }
};