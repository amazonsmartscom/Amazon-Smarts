const Order = require('../models/Order');

// 1. CALCULATE EMI MATH
exports.calculateEmi = (req, res) => {
  const { totalAmount, downPaymentPercent, tenureMonths } = req.body;
  
  const monthlyInterestRate = 0.02; // 2% per month (Admin configured)
  const minimumEmiCharge = 150;     // Minimum fee constraint

  const downPaymentAmount = totalAmount * (downPaymentPercent / 100);
  const principal = totalAmount - downPaymentAmount;

  // Standard Financial EMI Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
  let monthlyEmi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) / 
                   (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

  if (monthlyEmi < minimumEmiCharge) monthlyEmi = minimumEmiCharge;

  res.json({
    downPaymentAmount: Math.round(downPaymentAmount),
    principalAmount: Math.round(principal),
    monthlyEmi: Math.round(monthlyEmi),
    totalPayable: Math.round(downPaymentAmount + (monthlyEmi * tenureMonths)),
    interestRateMonthly: monthlyInterestRate
  });
};

// 2. PROCESS KYC WITH 1MB RESTRICTION & MOCK OCR
exports.processKyc = async (req, res) => {
  try {
    const files = req.files;
    if (!files || !files.panCard || !files.idFront || !files.selfie) {
      return res.status(400).json({ message: "All KYC documents are required." });
    }

    // STRICT 1MB File Size Check for Pixel Clarity
    const MIN_SIZE = 1 * 1024 * 1024; // 1 MB
    for (const key in files) {
      if (files[key][0].size < MIN_SIZE) {
        return res.status(400).json({ message: `${key} must be at least 1MB for AI clarity.` });
      }
    }

    // MOCK AI OCR EXTRACTION (Replace with AWS Textract / Google Vision API later)
    const extractedData = {
      panNumber: "ABCDE1234F",
      idNumber: "XXXX-XXXX-1234",
      name: "Verified Customer"
    };

    res.json({
      message: "KYC Documents uploaded and read successfully. Please verify details.",
      extractedData,
      // In production, upload these buffers to AWS S3 and return the URLs here
      filePaths: {
        selfieUrl: "/mock/s3/selfie.jpg", panCardUrl: "/mock/s3/pan.jpg",
        idFrontUrl: "/mock/s3/front.jpg", idBackUrl: "/mock/s3/back.jpg"
      }
    });
  } catch (error) {
    res.status(500).json({ message: "KYC Processing Error", error: error.message });
  }
};

// 3. ADMIN FORECLOSURE
exports.forecloseLoan = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || !order.isEmiOrder) return res.status(404).json({ message: "EMI Order not found" });

    const foreclosureFee = 500; // Fixed admin fee
    let remainingPrincipal = 0;
    
    order.emiDetails.schedule.forEach(emi => {
      if (emi.status === 'Pending') {
        remainingPrincipal += emi.amountDue; // Simplification: In real finance, strip out future interest here.
        emi.status = 'Cancelled (Foreclosed)';
      }
    });

    order.emiDetails.isForeclosed = true;
    order.emiDetails.foreclosureFee = foreclosureFee;
    
    // Note: You would also call Razorpay.subscriptions.cancel(order.emiDetails.mandateId) here

    await order.save();
    res.json({ message: "Loan Foreclosed successfully.", totalSettlement: remainingPrincipal + foreclosureFee, order });
  } catch (error) {
    res.status(500).json({ message: "Error foreclosing loan" });
  }
};