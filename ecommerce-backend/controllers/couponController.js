// controllers/couponController.js
const Coupon = require('../models/Coupon');

// 1. Validate Coupon (Used on Checkout Page)
exports.validateCoupon = async (req, res) => {
  try {
    // 🚀 FIXED: We now receive cartItems instead of just cartTotal
    const { code, cartItems } = req.body;
    if (!code) return res.status(400).json({ message: "Coupon code is required" });
    if (!cartItems || cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) return res.status(404).json({ message: "Invalid coupon code" });
    if (!coupon.isActive) return res.status(400).json({ message: "This coupon is no longer active" });
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({ message: "This coupon has expired" });
    }

    // 🚀 NEW: Calculate Eligible Total
    let eligibleTotal = 0;
    
    // If the coupon has specific products linked to it...
    if (coupon.applicableProducts && coupon.applicableProducts.length > 0) {
      const applicableIds = coupon.applicableProducts.map(id => id.toString());
      
      cartItems.forEach(item => {
        if (applicableIds.includes(item.product.toString())) {
          eligibleTotal += (item.price * item.quantity);
        }
      });

      if (eligibleTotal === 0) {
        return res.status(400).json({ message: "This coupon is not applicable to any items in your cart." });
      }
    } else {
      // If no specific products are linked, it applies to everything
      eligibleTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

    // Check minimum purchase amount against the ELIGIBLE total
    if (eligibleTotal < coupon.minPurchaseAmount) {
      return res.status(400).json({ message: `Minimum purchase of ₹${coupon.minPurchaseAmount} of eligible items required.` });
    }

    // Calculate Discount
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (eligibleTotal * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }

    // Ensure discount doesn't exceed the eligible total
    discountAmount = Math.min(discountAmount, eligibleTotal);

    res.status(200).json({ success: true, discountAmount });
  } catch (error) {
    res.status(500).json({ message: "Error validating coupon", error: error.message });
  }
};

// ==========================================
// 🚀 ADMIN FUNCTIONS
// ==========================================

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupons", error: error.message });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minPurchaseAmount, expiresAt, applicableProducts } = req.body;
    
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) return res.status(400).json({ message: "Coupon code already exists!" });

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minPurchaseAmount: minPurchaseAmount || 0,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      applicableProducts: applicableProducts || [] // 🚀 NEW
    });

    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: "Error creating coupon", error: error.message });
  }
};

exports.toggleCouponStatus = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    coupon.isActive = !coupon.isActive;
    await coupon.save();

    res.status(200).json({ message: "Coupon status updated", isActive: coupon.isActive });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon", error: error.message });
  }
};