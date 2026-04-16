// backend/controllers/emiController.js
const Order = require('../models/Order');
const EmiConfig = require('../models/EmiConfig');
const Product = require('../models/Product');

// 🚀 1. GET DYNAMIC CART CONFIGURATION (Hierarchy: Product > Category > Global)
exports.getCartEmiConfig = async (req, res) => {
  try {
    const { cartItems } = req.body;
    let config = await EmiConfig.findOne();
    if (!config) config = await EmiConfig.create({}); // Create default if missing

    let highestMinDownPayment = config.global.minDownPaymentPercent;
    let overlappingTenures = config.global.allowedTenures;

    // Evaluate the cart strictly
    for (let item of cartItems) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      let itemDownPayment = config.global.minDownPaymentPercent;
      let itemTenures = config.global.allowedTenures;

      // Check Category Override
      const catOverride = config.categories.find(c => c.categoryName === product.category);
      if (catOverride) {
        if(catOverride.minDownPaymentPercent !== undefined) itemDownPayment = catOverride.minDownPaymentPercent;
        if(catOverride.allowedTenures?.length) itemTenures = catOverride.allowedTenures;
      }

      // Check Product Override (Highest Priority)
      if (product.emiOverride?.isActive) {
        itemDownPayment = product.emiOverride.minDownPaymentPercent;
        itemTenures = product.emiOverride.allowedTenures;
      }

      // Apply Strictest Rules to overall cart
      if (itemDownPayment > highestMinDownPayment) highestMinDownPayment = itemDownPayment;
      
      // Intersection of allowed tenures
      overlappingTenures = overlappingTenures.filter(t => itemTenures.includes(t));
    }

    if (overlappingTenures.length === 0) overlappingTenures = [3]; // Fallback

    res.json({
      minDownPaymentPercent: highestMinDownPayment,
      allowedTenures: overlappingTenures.sort((a,b) => a-b)
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching EMI config", error: error.message });
  }
};

// 🚀 2. CALCULATE ACTUAL EMI
exports.calculateEmi = async (req, res) => {
  try {
    const { cartItems, downPaymentPercent, tenureMonths } = req.body;
    
    let config = await EmiConfig.findOne();
    if (!config) config = await EmiConfig.create({});

    let totalOrderValue = 0;
    let totalMonthlyEmi = 0;

    for (let item of cartItems) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      const itemPrice = (item.discountPrice || item.price) * item.quantity;
      totalOrderValue += itemPrice;

      let interestRate = config.global.interestRateMonthly / 100;

      const catOverride = config.categories.find(c => c.categoryName === product.category);
      if (catOverride && catOverride.interestRateMonthly !== undefined) interestRate = catOverride.interestRateMonthly / 100;
      if (product.emiOverride?.isActive) interestRate = product.emiOverride.interestRateMonthly / 100;

      const itemDownPayment = itemPrice * (downPaymentPercent / 100);
      const itemPrincipal = itemPrice - itemDownPayment;

      let itemEmi = 0;
      if (interestRate > 0) {
        itemEmi = (itemPrincipal * interestRate * Math.pow(1 + interestRate, tenureMonths)) / 
                  (Math.pow(1 + interestRate, tenureMonths) - 1);
      } else {
        itemEmi = itemPrincipal / tenureMonths; // 0% Interest case
      }
      totalMonthlyEmi += itemEmi;
    }

    const totalDownPayment = totalOrderValue * (downPaymentPercent / 100);
    const principalToFinance = totalOrderValue - totalDownPayment;

    // Admin Minimum Charge Safety Net
    if (totalMonthlyEmi < 150) totalMonthlyEmi = 150;

    res.json({
      totalOrderValue,
      downPaymentAmount: Math.round(totalDownPayment),
      principalAmount: Math.round(principalToFinance),
      monthlyEmi: Math.round(totalMonthlyEmi),
      tenureMonths
    });
  } catch (error) {
    res.status(500).json({ message: "Calculation Error" });
  }
};

// 🚀 3. ADMIN CONFIG CONTROLLERS
exports.getAdminConfig = async (req, res) => {
  let config = await EmiConfig.findOne();
  if (!config) config = await EmiConfig.create({});
  res.json(config);
};

exports.updateAdminConfig = async (req, res) => {
  let config = await EmiConfig.findOne();
  if (!config) config = new EmiConfig();
  config.global = req.body.global;
  config.categories = req.body.categories;
  await config.save();
  res.json({ message: "EMI Config updated successfully", config });
};

// 🚀 4. API-BASED KYC
exports.verifyPanCard = async (req, res) => {
  try {
    const { panNumber, customerName } = req.body;
    if (panNumber.length !== 10) return res.status(400).json({ message: "Invalid PAN Format" });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({
      success: true,
      message: "PAN Verified Successfully",
      data: {
        registeredName: customerName ? customerName.toUpperCase() : "VERIFIED USER", 
        panNumber: panNumber.toUpperCase(),
        isValid: true
      }
    });
  } catch (error) {
    res.status(500).json({ message: "PAN Verification Failed" });
  }
};

// 🚀 2. SEND AADHAAR OTP (Simulates UIDAI behavior)
exports.sendAadhaarOtp = async (req, res) => {
  try {
    const { aadhaarNumber } = req.body;
    if (aadhaarNumber.length !== 12) return res.status(400).json({ message: "Invalid Aadhaar Number" });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mocking real API behavior: UIDAI returns the last 4 digits of the linked mobile
    const mockLastFourDigits = Math.floor(1000 + Math.random() * 9000).toString();

    res.json({
      success: true,
      referenceId: "ref_" + Date.now(), 
      mobileEnding: mockLastFourDigits, // 🚀 Send back masked mobile ending
      message: `OTP sent to Aadhaar registered mobile number.`
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send Aadhaar OTP" });
  }
};

exports.verifyAadhaarOtp = async (req, res) => {
  try {
    const { referenceId, otp } = req.body;
    
    // Sandbox OTP bypass
    if (otp !== "123456") { 
      return res.status(400).json({ message: "Invalid OTP entered." });
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({
      success: true,
      message: "Aadhaar Verified Successfully",
      data: {
        address: "123 Fake Street, Mumbai, Maharashtra, 400001",
        careOf: "Father Name"
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Aadhaar Verification Failed" });
  }
};

// 🚀 5. ADMIN FORECLOSURE
exports.forecloseLoan = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || !order.isEmiOrder) return res.status(404).json({ message: "EMI Order not found" });

    const foreclosureFee = 500; 
    let remainingPrincipal = 0;
    
    order.emiDetails.schedule.forEach(emi => {
      if (emi.status === 'Pending') {
        remainingPrincipal += emi.amountDue; 
        emi.status = 'Cancelled (Foreclosed)';
      }
    });

    order.emiDetails.isForeclosed = true;
    order.emiDetails.foreclosureFee = foreclosureFee;
    
    await order.save();
    res.json({ message: "Loan Foreclosed successfully.", totalSettlement: remainingPrincipal + foreclosureFee, order });
  } catch (error) {
    res.status(500).json({ message: "Error foreclosing loan" });
  }
};