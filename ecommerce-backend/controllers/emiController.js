// backend/controllers/emiController.js
const Order = require('../models/Order');
const EmiConfig = require('../models/EmiConfig');
const Product = require('../models/Product');

// 🚀 GET DYNAMIC CART CONFIGURATION (Hierarchy: Product > Category > Global)
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

      // 1. Check Category Override
      const catOverride = config.categories.find(c => c.categoryName === product.category);
      if (catOverride) {
        if(catOverride.minDownPaymentPercent) itemDownPayment = catOverride.minDownPaymentPercent;
        if(catOverride.allowedTenures?.length) itemTenures = catOverride.allowedTenures;
      }

      // 2. Check Product Override (Highest Priority)
      if (product.emiOverride?.isActive) {
        itemDownPayment = product.emiOverride.minDownPaymentPercent;
        itemTenures = product.emiOverride.allowedTenures;
      }

      // Apply Strictest Rules to overall cart
      if (itemDownPayment > highestMinDownPayment) highestMinDownPayment = itemDownPayment;
      
      // Intersection of allowed tenures (only allow months supported by ALL items in cart)
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

// 🚀 CALCULATE ACTUAL EMI BASED ON HIERARCHY
exports.calculateEmi = async (req, res) => {
  try {
    const { cartItems, downPaymentPercent, tenureMonths } = req.body;
    
    let config = await EmiConfig.findOne();
    if (!config) config = await EmiConfig.create({});

    let totalOrderValue = 0;
    let totalMonthlyEmi = 0;

    // Calculate EMI mathematically per item based on its specific hierarchy rule
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

// 🚀 ADMIN CONFIG CONTROLLERS
exports.getAdminConfig = async (req, res) => {
  let config = await EmiConfig.findOne();
  if (!config) config = await EmiConfig.create({});
  res.json(config);
};

exports.updateAdminConfig = async (req, res) => {
  let config = await EmiConfig.findOne();
  config.global = req.body.global;
  config.categories = req.body.categories;
  await config.save();
  res.json({ message: "EMI Config updated successfully", config });
};

// 🚀 KYC & FORECLOSURE (Keep your existing functions here)
exports.processKyc = async (req, res) => {
  // ... (Keep your existing processKyc logic from the previous step)
  res.json({ extractedData: { panNumber: "ABCDE1234F", idNumber: "XXXX-1234", name: "Verified Customer" } });
};

exports.forecloseLoan = async (req, res) => {
  // ... (Keep your existing forecloseLoan logic from the previous step)
  res.json({ message: "Loan Foreclosed" });
};