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


// controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');
const WalletTransaction = require('../models/WalletTransaction');

// 1. Create Order (WITH VARIANT FIX)
exports.createOrder = async (req, res) => {
  try {
    const { userId, orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // 🚀 We safely map the items to ensure selectedOptions (variants) are captured
    const mappedOrderItems = orderItems.map(item => ({
      name: item.name,
      quantity: item.quantity || item.qty, 
      image: item.image,
      price: item.price,
      product: item.product,
      selectedOptions: item.selectedOptions || {} 
    }));

    const finalItemsPrice = itemsPrice || totalPrice;

    const order = new Order({
      user: userId, 
      orderItems: mappedOrderItems, 
      shippingAddress,
      itemsPrice: finalItemsPrice,
      shippingPrice: shippingPrice || 0,
      totalPrice,
      status: 'Processing' 
    });
    
    const createdOrder = await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: createdOrder,
      orderId: createdOrder._id,
      amount: Math.round(totalPrice * 100),
      currency: "INR"
    });

  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: 'Server error during order creation', error: error.message });
  }
};

// 2. Simulate Payment Success & Affiliate Logic
exports.simulatePayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        razorpay_order_id: `fake_order_${Date.now()}`,
        razorpay_payment_id: `fake_payment_${Date.now()}`,
        razorpay_signature: "fake_signature",
      };

      const updatedOrder = await order.save();
      
      // 🚀 AFFILIATE COMMISSION ENGINE
      try {
        const buyingUser = await User.findById(order.user);

        if (buyingUser && buyingUser.referredBy) {
          const referrer = await User.findById(buyingUser.referredBy);
          
          if (referrer) {
            const baseAmount = order.itemsPrice > 0 ? order.itemsPrice : order.totalPrice;
            const commissionAmount = Math.round(baseAmount * 0.05);

            referrer.wallet.availableBalance += commissionAmount;
            referrer.wallet.totalEarnings += commissionAmount;
            await referrer.save();

            await WalletTransaction.create({
              userId: referrer._id,
              amount: commissionAmount,
              type: 'credit',
              source: 'referral_commission',
              status: 'completed',
              relatedOrderId: order._id
            });

            console.log(`💰 COMMISSION PAID! ₹${commissionAmount} added to ${referrer.name}'s wallet.`);
          }
        }
      } catch (commissionError) {
        console.error("Commission calculation failed, but order was paid:", commissionError);
      }

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error("Payment Simulation Error:", error);
    res.status(500).json({ message: 'Server error during payment simulation' });
  }
};

// 3. Fetch orders for a specific user
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Fetch Orders Error:", error);
//     res.status(500).json({ message: 'Error fetching your orders' });
//   }
// };
exports.getUserOrders = async (req, res) => {
  try {
    // 🚀 It MUST be req.params.userId to match our route
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your orders' });
  }
};
// 4. ADMIN: Get all orders across the whole platform
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Admin Fetch Orders Error:", error);
    res.status(500).json({ message: 'Error fetching all orders' });
  }
};

// 5. ADMIN: Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    order.status = req.body.status;
    await order.save();
    
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};