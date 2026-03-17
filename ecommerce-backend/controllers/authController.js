// // controllers/authController.js
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');

// exports.registerUser = async (req, res) => {
//   console.log("==========================================");
//   console.log("🚀 1. REGISTRATION API HIT!");
//   console.log("📦 2. Data received:", req.body);
  
//   try {
//     const { name, email, countryCode, mobileNumber, password, referralCode } = req.body;

//     if (!name || !email || !password) {
//       console.log("❌ 3. FAILED: Missing required fields!");
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     console.log("🔍 4. Checking if user exists...");
//     const userExists = await User.findOne({ $or: [{ email }, { mobileNumber }] });
//     if (userExists) {
//       console.log("❌ 5. FAILED: User already exists!");
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     console.log("🔐 6. Hashing password...");
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     console.log("🎟️ 7. Generating Referral Code...");
//     const myReferralCode = name.substring(0, 4).toUpperCase() + crypto.randomBytes(2).toString('hex').toUpperCase();

//     let referredBy = null;
//     if (referralCode) {
//       const referringUser = await User.findOne({ myReferralCode: referralCode });
//       if (referringUser) referredBy = referringUser._id;
//     }

//     console.log("📱 8. Generating OTP...");
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = Date.now() + 10 * 60 * 1000;

//     console.log("💾 9. Saving user to database...");
//     const newUser = new User({
//       name, email, countryCode, mobileNumber, password: hashedPassword,
//       myReferralCode, referredBy, otp, otpExpires
//     });
    
//     await newUser.save();
//     console.log("✅ 10. USER SAVED SUCCESSFULLY!");

//     res.status(201).json({ 
//       message: 'User registered. Please verify OTP.', 
//       email: newUser.email,
//       testOtp: otp 
//     });

//   } catch (error) {
//     console.error("🔥 FATAL SERVER ERROR:", error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// // Verify OTP
// exports.verifyOtp = async (req, res) => {
//   console.log("🔐 VERIFY OTP API HIT!");
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

//     // Check if OTP matches and is not expired
//     if (user.otp !== otp || user.otpExpires < Date.now()) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     // Mark as verified and clear OTP
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();

//     console.log("✅ USER VERIFIED SUCCESSFULLY!");
//     res.status(200).json({ message: 'Account verified successfully. You can now login.' });
//   } catch (error) {
//     console.error("🔥 OTP ERROR:", error);
//     res.status(500).json({ message: 'Server Error during verification' });
//   }
// };

// // Login
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'Invalid credentials' });

//     if (!user.isVerified) return res.status(403).json({ message: 'Please verify your account first' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate JWT Token
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       // 🚀 FIX: Added "role: user.role" right here!
//       user: { id: user._id, name: user.name, email: user.email, role: user.role, myReferralCode: user.myReferralCode, wallet: user.wallet }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };



// // controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail'); // 🚀 Import the email utility

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// // 1. REGISTER: Creates user, generates OTP, sends Email (DOES NOT LOG IN YET)
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, referredByCode } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // 🚀 GENERATE 6-DIGIT OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

//     // Create user but mark as unverified
//     const user = await User.create({
//       name,
//       email,
//       password,
//       myReferralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
//       isVerified: false,
//       otp,
//       otpExpiry
//     });

//     // Handle Referral Logic (Keep your existing referral logic here if you have it)
//     // ...

//     // 🚀 SEND OTP VIA EMAIL
//     const message = `
//       <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 15px; mb-6;">
//           <h1 style="color: #f97316; font-weight: 900; margin: 0; font-size: 28px; letter-spacing: 2px;">GADGET<span style="color: #0f172a;">STORE</span></h1>
//         </div>
        
//         <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px;">Verify your email address</h2>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Thank you for registering. To secure your account, please enter the following One-Time Password (OTP) on the verification page:</p>
        
//         <div style="text-align: center; margin: 40px 0;">
//           <div style="background-color: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; padding: 20px; display: inline-block;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${otp}</span>
//           </div>
//         </div>
        
//         <p style="color: #6b7280; font-size: 14px; text-align: center;">This code will expire in <strong>10 minutes</strong>. Do not share it with anyone.</p>
        
//         <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
//         <p style="color: #9ca3af; font-size: 12px; text-align: center;">If you didn't request this email, please ignore it.</p>
//       </div>
//     `;

//     try {
//       await sendEmail({ email: user.email, subject: 'Your GadgetStore Verification Code', message });
//     } catch (emailError) {
//       console.error("Email failed to send:", emailError);
//       // Optional: you could delete the unverified user here if email fails, or leave them to try again.
//     }

//     res.status(201).json({ 
//       message: 'Registration successful. Please check your email for the OTP.',
//       email: user.email // Send email back so frontend knows who to verify
//     });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // 2. VERIFY OTP: Checks code, marks verified, logs user in
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Check if OTP matches and is not expired
//     if (user.otp !== otp) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }
//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
//     }

//     // 🚀 SUCCESS: Mark as verified and clear OTP
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     // Log them in!
//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       myReferralCode: user.myReferralCode,
//       token: generateToken(user._id),
//     });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // 3. LOGIN: Block unverified users
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
      
//       // 🚀 NEW: Block login if not verified
//       if (!user.isVerified) {
//         return res.status(401).json({ message: 'Please verify your email address before logging in.', requiresVerification: true });
//       }

//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         myReferralCode: user.myReferralCode,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


// // controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// // 1. REGISTER: Creates user, generates OTP, sends Email (DOES NOT LOG IN YET)
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, referredByCode } = req.body;

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // 🚀 PROCESS REFERRAL CODE SAFELY
//     let referrerId = null;
//     if (referredByCode) {
//       const referrer = await User.findOne({ myReferralCode: referredByCode });
//       if (referrer) {
//         referrerId = referrer._id;
//       }
//     }

//     // 🚀 GENERATE 6-DIGIT OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes

//     // Create user but mark as unverified
//     const user = await User.create({
//       name,
//       email,
//       password,
//       myReferralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
//       referredBy: referrerId, // Links to the person who referred them
//       isVerified: false,
//       otp,
//       otpExpiry
//     });

//     // 🚀 PREMIUM HTML OTP EMAIL
//     const message = `
//       <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 15px; margin-bottom: 20px;">
//           <h1 style="color: #f97316; font-weight: 900; margin: 0; font-size: 28px; letter-spacing: 2px;">GADGET<span style="color: #0f172a;">STORE</span></h1>
//         </div>
        
//         <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px;">Verify your email address</h2>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Thank you for registering. To secure your account, please enter the following One-Time Password (OTP) on the verification page:</p>
        
//         <div style="text-align: center; margin: 40px 0;">
//           <div style="background-color: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; padding: 20px; display: inline-block;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${otp}</span>
//           </div>
//         </div>
        
//         <p style="color: #6b7280; font-size: 14px; text-align: center;">This code will expire in <strong>10 minutes</strong>. Do not share it with anyone.</p>
        
//         <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
//         <p style="color: #9ca3af; font-size: 12px; text-align: center;">If you didn't request this email, please ignore it.</p>
//       </div>
//     `;

//     // 🚀 BULLETPROOF EMAIL SENDER
//     try {
//       await sendEmail({ email: user.email, subject: 'Your GadgetStore Verification Code', message });
//       console.log(`✉️ Email successfully sent to ${user.email}`);
//     } catch (emailError) {
//       console.error("⚠️ Email sending failed (Check .env credentials):", emailError.message);
//       console.log(`[FALLBACK] The OTP for ${user.email} is: ${otp}`); 
//       // We do NOT crash the app here. We let the user proceed to the OTP screen!
//     }

//     res.status(201).json({ 
//       message: 'Registration successful. Please check your email for the OTP.',
//       email: user.email 
//     });

//   } catch (error) {
//     console.error("🔥 REGISTRATION CRASH:", error);
//     res.status(500).json({ message: 'Server error during registration', error: error.message });
//   }
// };

// // 2. VERIFY OTP: Checks code, marks verified, logs user in
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Check if OTP matches and is not expired
//     if (user.otp !== otp) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }
//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
//     }

//     // 🚀 SUCCESS: Mark as verified and clear OTP fields securely
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     // Log them in!
//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       myReferralCode: user.myReferralCode,
//       token: generateToken(user._id),
//     });

//   } catch (error) {
//     console.error("🔥 VERIFY OTP CRASH:", error);
//     res.status(500).json({ message: 'Server error during verification', error: error.message });
//   }
// };

// // 3. LOGIN: Block unverified users
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
      
//       // Block login if not verified
//       if (!user.isVerified) {
//         return res.status(401).json({ message: 'Please verify your email address before logging in.', requiresVerification: true });
//       }

//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         myReferralCode: user.myReferralCode,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error("🔥 LOGIN CRASH:", error);
//     res.status(500).json({ message: 'Server error during login', error: error.message });
//   }
// };


// // controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail');

// // 🚀 FIX: Added a fallback secret just in case your .env is missing it
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET || 'gadgetstore_super_secret_key_123', { expiresIn: '30d' });
// };

// // 1. REGISTER
// exports.registerUser = async (req, res) => {
//   try {
//     // const { name, email, password, referredByCode } = req.body;
//     const { name, email, password, referralCode } = req.body; // 🚀 Matches your frontend state

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     let referrerId = null;
//     if (referralCode) { // 🚀 Updated variable name
//       const referrer = await User.findOne({ myReferralCode: referralCode });
//       if (referrer) {
//         referrerId = referrer._id;
//       }
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; 

//     // Creates user and triggers the password hash for the FIRST and ONLY time
//     const user = await User.create({
//       name,
//       email,
//       password,
//       myReferralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
//       referredBy: referrerId, 
//       isVerified: false,
//       otp,
//       otpExpiry
//     });

//     const message = `
//       <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 15px; margin-bottom: 20px;">
//           <h1 style="color: #f97316; font-weight: 900; margin: 0; font-size: 28px; letter-spacing: 2px;">GADGET<span style="color: #0f172a;">STORE</span></h1>
//         </div>
//         <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px;">Verify your email address</h2>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Thank you for registering. To secure your account, please enter the following One-Time Password (OTP) on the verification page:</p>
//         <div style="text-align: center; margin: 40px 0;">
//           <div style="background-color: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; padding: 20px; display: inline-block;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${otp}</span>
//           </div>
//         </div>
//         <p style="color: #6b7280; font-size: 14px; text-align: center;">This code will expire in <strong>10 minutes</strong>.</p>
//       </div>
//     `;

//     try {
//       await sendEmail({ email: user.email, subject: 'Your GadgetStore Verification Code', message });
//       console.log(`✉️ Email successfully sent to ${user.email}`);
//     } catch (emailError) {
//       console.error("⚠️ Email sending failed:", emailError.message);
//       console.log(`[FALLBACK] The OTP for ${user.email} is: ${otp}`); 
//     }

//     res.status(201).json({ message: 'Registration successful.', email: user.email });

//   } catch (error) {
//     console.error("🔥 REGISTRATION CRASH:", error);
//     res.status(500).json({ message: 'Server error during registration', error: error.message });
//   }
// };

// // 2. VERIFY OTP
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (user.otp !== otp) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }
//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
//     }

//     // 🚀 CRITICAL FIX: We use findByIdAndUpdate to bypass the password hook!
//     // This securely updates the status WITHOUT double-hashing the password.
//     const updatedUser = await User.findByIdAndUpdate(
//       user._id,
//       {
//         $set: { isVerified: true },
//         $unset: { otp: 1, otpExpiry: 1 } // Deletes the OTP fields from the database
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       myReferralCode: updatedUser.myReferralCode,
//       token: generateToken(updatedUser._id),
//     });

//   } catch (error) {
//     console.error("🔥 VERIFY OTP CRASH:", error);
//     res.status(500).json({ message: 'Server error during verification', error: error.message });
//   }
// };

// // 3. LOGIN
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     // Compare passwords
//     if (user && (await user.matchPassword(password))) {
      
//       // Block login if not verified
//       if (!user.isVerified) {
//         return res.status(401).json({ message: 'Please verify your email address before logging in.', requiresVerification: true });
//       }

//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         myReferralCode: user.myReferralCode,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error("🔥 LOGIN CRASH:", error);
//     res.status(500).json({ message: 'Server error during login', error: error.message });
//   }
// };


// // controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail');

// // 🚀 Helper to ensure Referral Code is unique in DB
// const generateUniqueReferralCode = async () => {
//   let code;
//   let isUnique = false;
//   while (!isUnique) {
//     code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     const existingUser = await User.findOne({ myReferralCode: code });
//     if (!existingUser) isUnique = true;
//   }
//   return code;
// };

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET || 'gadgetstore_super_secret_key_123', { expiresIn: '30d' });
// };

// // 1. REGISTER
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, referralCode } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     let referrerId = null;
//     if (referralCode) {
//       const referrer = await User.findOne({ myReferralCode: referralCode });
//       if (referrer) {
//         referrerId = referrer._id;
//       }
//     }

//     // 🚀 FIX: Generate a guaranteed unique referral code
//     const myReferralCode = await generateUniqueReferralCode();

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; 

//     const user = await User.create({
//       name,
//       email,
//       password,
//       myReferralCode, 
//       referredBy: referrerId, 
//       isVerified: false,
//       otp,
//       otpExpiry
//     });

//     const message = `
//       <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 15px; margin-bottom: 20px;">
//           <h1 style="color: #f97316; font-weight: 900; margin: 0; font-size: 28px; letter-spacing: 2px;">GADGET<span style="color: #0f172a;">STORE</span></h1>
//         </div>
//         <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px;">Verify your email address</h2>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Your OTP for account verification is:</p>
//         <div style="text-align: center; margin: 40px 0;">
//           <div style="background-color: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; padding: 20px; display: inline-block;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${otp}</span>
//           </div>
//         </div>
//         <p style="color: #6b7280; font-size: 14px; text-align: center;">Valid for 10 minutes.</p>
//       </div>
//     `;

//     try {
//       await sendEmail({ email: user.email, subject: 'Verify Your GadgetStore Account', message });
//     } catch (emailError) {
//       console.log(`[FALLBACK] OTP for ${user.email} is: ${otp}`); 
//     }

//     res.status(201).json({ message: 'Registration successful.', email: user.email });

//   } catch (error) {
//     console.error("🔥 REGISTRATION CRASH:", error);
//     res.status(500).json({ message: 'Server error during registration', error: error.message });
//   }
// };

// // 2. VERIFY OTP
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
//     if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired' });

//     const updatedUser = await User.findByIdAndUpdate(
//       user._id,
//       { $set: { isVerified: true }, $unset: { otp: 1, otpExpiry: 1 } },
//       { new: true }
//     );

//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       myReferralCode: updatedUser.myReferralCode,
//       token: generateToken(updatedUser._id),
//     });

//   } catch (error) {
//     console.error("🔥 VERIFY OTP CRASH:", error);
//     res.status(500).json({ message: 'Verification error', error: error.message });
//   }
// };

// // 3. LOGIN
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       if (!user.isVerified) {
//         return res.status(401).json({ message: 'Please verify your email.', requiresVerification: true });
//       }

//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         myReferralCode: user.myReferralCode,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Login error', error: error.message });
//   }
// };




// // controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail');

// // 🚀 Helper to ensure Referral Code is unique in DB
// const generateUniqueReferralCode = async () => {
//   let code;
//   let isUnique = false;
//   while (!isUnique) {
//     code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     const existingUser = await User.findOne({ myReferralCode: code });
//     if (!existingUser) isUnique = true;
//   }
//   return code;
// };

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET || 'gadgetstore_super_secret_key_123', { expiresIn: '30d' });
// };

// // 1. REGISTER
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, referralCode } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     let referrerId = null;
//     if (referralCode) {
//       const referrer = await User.findOne({ myReferralCode: referralCode });
//       if (referrer) {
//         referrerId = referrer._id;
//       }
//     }

//     const myReferralCode = await generateUniqueReferralCode();
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; 

//     const user = await User.create({
//       name,
//       email,
//       password,
//       myReferralCode, 
//       referredBy: referrerId, 
//       isVerified: false,
//       otp,
//       otpExpiry
//     });

//     const message = `
//       <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 15px; margin-bottom: 20px;">
//           <h1 style="color: #f97316; font-weight: 900; margin: 0; font-size: 28px; letter-spacing: 2px;">AMAZON<span style="color: #0f172a;">SMARTS</span></h1>
//         </div>
//         <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px;">Verify your email address</h2>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Your OTP for account verification is:</p>
//         <div style="text-align: center; margin: 40px 0;">
//           <div style="background-color: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; padding: 20px; display: inline-block;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${otp}</span>
//           </div>
//         </div>
//         <p style="color: #6b7280; font-size: 14px; text-align: center;">Valid for 10 minutes.</p>
//       </div>
//     `;

//     try {
//       await sendEmail({ email: user.email, subject: 'Verify Your Amazon Smarts Account', message });
//     } catch (emailError) {
//       console.log(`[FALLBACK] OTP for ${user.email} is: ${otp}`); 
//     }

//     res.status(201).json({ message: 'Registration successful.', email: user.email });

//   } catch (error) {
//     console.error("🔥 REGISTRATION CRASH:", error);
//     res.status(500).json({ message: 'Server error during registration', error: error.message });
//   }
// };

// // 2. VERIFY OTP
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
//     if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired' });

//     const updatedUser = await User.findByIdAndUpdate(
//       user._id,
//       { $set: { isVerified: true }, $unset: { otp: 1, otpExpiry: 1 } },
//       { new: true }
//     );

//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       myReferralCode: updatedUser.myReferralCode,
//       token: generateToken(updatedUser._id),
//     });

//   } catch (error) {
//     console.error("🔥 VERIFY OTP CRASH:", error);
//     res.status(500).json({ message: 'Verification error', error: error.message });
//   }
// };

// // 3. LOGIN
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       if (!user.isVerified) {
//         return res.status(401).json({ message: 'Please verify your email.', requiresVerification: true });
//       }

//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         myReferralCode: user.myReferralCode,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Login error', error: error.message });
//   }
// };

// // 🚀 4. SEND OTP ONLY (Used for Checkout Verification)
// exports.sendOtpOnly = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; 

//     // Find the user, or create a temporary "Guest" user so the OTP can be saved in the DB
//     let user = await User.findOne({ email });
    
//     if (!user) {
//       // Create a guest shell account
//       user = await User.create({
//         name: 'Guest Customer',
//         email: email,
//         password: Math.random().toString(36).slice(-8) + 'A1@', // Random strong password
//         myReferralCode: await generateUniqueReferralCode(),
//         isVerified: false,
//         otp,
//         otpExpiry
//       });
//     } else {
//       // Update existing user with new OTP
//       user.otp = otp;
//       user.otpExpiry = otpExpiry;
//       await user.save();
//     }

//     const message = `
//       <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 15px; margin-bottom: 20px;">
//           <h1 style="color: #f97316; font-weight: 900; margin: 0; font-size: 28px; letter-spacing: 2px;">AMAZON<span style="color: #0f172a;">SMARTS</span></h1>
//         </div>
//         <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px;">Your Checkout Verification Code</h2>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Please use the following OTP to securely complete your order:</p>
//         <div style="text-align: center; margin: 40px 0;">
//           <div style="background-color: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; padding: 20px; display: inline-block;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${otp}</span>
//           </div>
//         </div>
//         <p style="color: #6b7280; font-size: 14px; text-align: center;">Valid for 10 minutes.</p>
//       </div>
//     `;

//     try {
//       await sendEmail({ email: user.email, subject: 'Your Checkout OTP', message });
//     } catch (emailError) {
//       console.log(`[FALLBACK] Checkout OTP for ${user.email} is: ${otp}`); 
//     }

//     res.status(200).json({ success: true, message: "OTP sent successfully" });

//   } catch (error) {
//     console.error("🔥 SEND OTP CRASH:", error);
//     res.status(500).json({ message: 'Server error sending OTP', error: error.message });
//   }
// };



// // controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail');

// // 🚀 Helper to ensure Referral Code is unique in DB
// const generateUniqueReferralCode = async () => {
//   let code;
//   let isUnique = false;
//   while (!isUnique) {
//     code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     const existingUser = await User.findOne({ myReferralCode: code });
//     if (!existingUser) isUnique = true;
//   }
//   return code;
// };

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET || 'gadgetstore_super_secret_key_123', { expiresIn: '30d' });
// };

// // 1. REGISTER
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, referralCode } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     let referrerId = null;
//     if (referralCode) {
//       const referrer = await User.findOne({ myReferralCode: referralCode });
//       if (referrer) {
//         referrerId = referrer._id;
//       }
//     }

//     const myReferralCode = await generateUniqueReferralCode();
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; 

//     const user = await User.create({
//       name,
//       email,
//       password,
//       myReferralCode, 
//       referredBy: referrerId, 
//       isVerified: false,
//       otp,
//       otpExpiry
//     });

//     const message = `
//       <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 15px; margin-bottom: 20px;">
//           <h1 style="color: #f97316; font-weight: 900; margin: 0; font-size: 28px; letter-spacing: 2px;">AMAZON<span style="color: #0f172a;">SMARTS</span></h1>
//         </div>
//         <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px;">Verify your email address</h2>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Your OTP for account verification is:</p>
//         <div style="text-align: center; margin: 40px 0;">
//           <div style="background-color: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; padding: 20px; display: inline-block;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${otp}</span>
//           </div>
//         </div>
//         <p style="color: #6b7280; font-size: 14px; text-align: center;">Valid for 10 minutes.</p>
//       </div>
//     `;

//     try {
//       await sendEmail({ email: user.email, subject: 'Verify Your Amazon Smarts Account', message });
//     } catch (emailError) {
//       console.log(`[FALLBACK] OTP for ${user.email} is: ${otp}`); 
//     }

//     res.status(201).json({ message: 'Registration successful.', email: user.email });

//   } catch (error) {
//     console.error("🔥 REGISTRATION CRASH:", error);
//     res.status(500).json({ message: 'Server error during registration', error: error.message });
//   }
// };

// // 2. VERIFY OTP
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: 'User not found' });
//     if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
//     if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired' });

//     const updatedUser = await User.findByIdAndUpdate(
//       user._id,
//       { $set: { isVerified: true }, $unset: { otp: 1, otpExpiry: 1 } },
//       { new: true }
//     );

//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       myReferralCode: updatedUser.myReferralCode,
//       token: generateToken(updatedUser._id),
//     });

//   } catch (error) {
//     console.error("🔥 VERIFY OTP CRASH:", error);
//     res.status(500).json({ message: 'Verification error', error: error.message });
//   }
// };

// // 3. LOGIN
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       if (!user.isVerified) {
//         return res.status(401).json({ message: 'Please verify your email.', requiresVerification: true });
//       }

//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         myReferralCode: user.myReferralCode,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Login error', error: error.message });
//   }
// };

// // 🚀 4. SEND OTP ONLY (Used for Checkout Verification)
// exports.sendOtpOnly = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; 

//     // Find the user, or create a temporary "Guest" user so the OTP can be saved in the DB
//     let user = await User.findOne({ email });
    
//     if (!user) {
//       // Create a guest shell account
//       user = await User.create({
//         name: 'Guest Customer',
//         email: email,
//         password: Math.random().toString(36).slice(-8) + 'A1@', // Random strong password
//         myReferralCode: await generateUniqueReferralCode(),
//         isVerified: false,
//         otp,
//         otpExpiry
//       });
//     } else {
//       // Update existing user with new OTP
//       user.otp = otp;
//       user.otpExpiry = otpExpiry;
//       await user.save();
//     }

//     const message = `
//       <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 15px; margin-bottom: 20px;">
//           <h1 style="color: #f97316; font-weight: 900; margin: 0; font-size: 28px; letter-spacing: 2px;">AMAZON<span style="color: #0f172a;">SMARTS</span></h1>
//         </div>
//         <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px;">Your Checkout Verification Code</h2>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Please use the following OTP to securely complete your order:</p>
//         <div style="text-align: center; margin: 40px 0;">
//           <div style="background-color: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; padding: 20px; display: inline-block;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${otp}</span>
//           </div>
//         </div>
//         <p style="color: #6b7280; font-size: 14px; text-align: center;">Valid for 10 minutes.</p>
//       </div>
//     `;

//     try {
//       await sendEmail({ email: user.email, subject: 'Your Checkout OTP', message });
//     } catch (emailError) {
//       console.log(`[FALLBACK] Checkout OTP for ${user.email} is: ${otp}`); 
//     }

//     res.status(200).json({ success: true, message: "OTP sent successfully" });

//   } catch (error) {
//     console.error("🔥 SEND OTP CRASH:", error);
//     res.status(500).json({ message: 'Server error sending OTP', error: error.message });
//   }
// };

// // 🚀 5. SEND FORGOT PASSWORD OTP
// exports.sendForgotPasswordOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "No account found with that email address." });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
//     user.otp = otp;
//     user.otpExpiry = Date.now() + 10 * 60 * 1000; 
//     await user.save();

//     const message = `
//       <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 15px; margin-bottom: 20px;">
//           <h1 style="color: #f97316; font-weight: 900; margin: 0; font-size: 28px; letter-spacing: 2px;">AMAZON<span style="color: #0f172a;">SMARTS</span></h1>
//         </div>
//         <h2 style="color: #1f2937; font-size: 20px; margin-top: 30px;">Password Reset Request</h2>
//         <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">We received a request to reset the password for your Amazon Smarts account. Here is your OTP:</p>
//         <div style="text-align: center; margin: 40px 0;">
//           <div style="background-color: #fff7ed; border: 2px dashed #fdba74; border-radius: 8px; padding: 20px; display: inline-block;">
//             <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ea580c;">${otp}</span>
//           </div>
//         </div>
//         <p style="color: #4b5563; font-size: 14px; text-align: center;">If you did not request this, please ignore this email.</p>
//         <p style="color: #6b7280; font-size: 14px; text-align: center;">Valid for 10 minutes.</p>
//       </div>
//     `;

//     try {
//       await sendEmail({ email: user.email, subject: 'Amazon Smarts - Password Reset OTP', message });
//     } catch (emailError) {
//       console.log(`[FALLBACK] Forgot Password OTP for ${user.email} is: ${otp}`); 
//     }

//     res.status(200).json({ message: "OTP sent to your email." });
//   } catch (error) {
//     console.error("Forgot Password OTP Error:", error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };

// // 🚀 6. VERIFY OTP AND RESET PASSWORD
// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP. Please check the code and try again." });
//     }
    
//     if (Date.now() > user.otpExpiry) {
//       return res.status(400).json({ message: "OTP has expired. Please request a new one." });
//     }
    
//     if (newPassword.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters long." });
//     }

//     // Update Password (The pre-save hook in models/User.js will hash it automatically)
//     user.password = newPassword;
    
//     // Clear the OTP
//     user.otp = undefined;
//     user.otpExpiry = undefined;
    
//     await user.save();

//     res.status(200).json({ message: "Password reset successful! You can now log in." });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     res.status(500).json({ message: "Server error resetting password." });
//   }
// };



// controllers/authController.js
const mongoose = require('mongoose');
const User = require('../models/User');
const WalletTransaction = require('../models/WalletTransaction');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// 🚀 DYNAMIC SETTINGS MODEL (No need to create a new file!)
const settingSchema = new mongoose.Schema({ signupBonus: { type: Number, default: 0 } });
const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);

const getBrandedOtpTemplate = (title, message, otpCode) => {
  const brandColor = "#232f3e"; 
  const accentColor = "#febd69"; 

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; background-color: #fff;">
      <div style="background-color: ${brandColor}; padding: 20px; text-align: center;">
        <h1 style="color: ${accentColor}; margin: 0; font-size: 26px; letter-spacing: -1px;">amazon<span style="color: #fff; font-weight: bold;">smarts</span></h1>
      </div>
      <div style="padding: 30px; line-height: 1.6;">
        <h2 style="color: #111; font-size: 20px; margin-top: 0; border-bottom: 2px solid ${accentColor}; padding-bottom: 10px; display: inline-block;">${title}</h2>
        <p style="font-size: 15px; color: #333; margin-top: 20px;">${message}</p>
        <div style="margin: 30px 0; text-align: center;">
          <span style="display: inline-block; padding: 15px 30px; font-size: 32px; font-weight: bold; color: #111; background-color: #f9f9f9; border: 2px dashed ${accentColor}; border-radius: 8px; letter-spacing: 5px;">
            ${otpCode}
          </span>
          <p style="font-size: 13px; color: #666; margin-top: 15px;">Valid for 10 minutes. Do not share this code with anyone.</p>
        </div>
      </div>
      <div style="background-color: #f0f2f2; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd;">
        <p style="margin: 0 0 10px 0;">This email was sent from a notification-only address. Please do not reply to this message.</p>
        <p style="margin: 0;">© ${new Date().getFullYear()} AmazonSmarts.com, Inc. or its affiliates</p>
      </div>
    </div>
  `;
};

const generateUniqueReferralCode = async () => {
  let code;
  let isUnique = false;
  while (!isUnique) {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const existingUser = await User.findOne({ myReferralCode: code });
    if (!existingUser) isUnique = true;
  }
  return code;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'gadgetstore_super_secret_key_123', { expiresIn: '30d' });
};

// 1. REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;
    const userExists = await User.findOne({ email });

    let referrerId = null;
    if (referralCode) {
      const referrer = await User.findOne({ myReferralCode: referralCode });
      if (referrer) referrerId = referrer._id;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; 

    let user;

    if (userExists) {
      if (userExists.isVerified) {
        return res.status(400).json({ message: 'User already exists with this email. Please sign in.' });
      } else {
        userExists.name = name;
        userExists.password = password; 
        userExists.referredBy = referrerId;
        userExists.otp = otp;
        userExists.otpExpiry = otpExpiry;
        user = await userExists.save();
      }
    } else {
      const myReferralCode = await generateUniqueReferralCode();
      user = await User.create({
        name, email, password, myReferralCode, referredBy: referrerId, isVerified: false, otp, otpExpiry
      });
    }

    const message = getBrandedOtpTemplate("Verify your email address", `Hello <strong>${name}</strong>,<br><br>Your OTP for account verification is:`, otp);

    try {
      await sendEmail({ email: user.email, subject: 'Verify Your Amazon Smarts Account', message });
    } catch (emailError) {
      console.log(`[FALLBACK] OTP for ${user.email} is: ${otp}`); 
    }

    res.status(201).json({ message: 'Registration successful.', email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// 2. VERIFY OTP & PAYOUT SIGNUP BONUS 🚀
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired' });

    // Store state before we update them
    const wasAlreadyVerified = user.isVerified;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { isVerified: true }, $unset: { otp: 1, otpExpiry: 1 } },
      { new: true }
    );

    // ==============================================
    // 🚀 SIGNUP BONUS LOGIC
    // ==============================================
    if (!wasAlreadyVerified && updatedUser.referredBy) {
      const referrer = await User.findById(updatedUser.referredBy);
      if (referrer) {
        let config = await Setting.findOne();
        const bonusAmount = config ? config.signupBonus : 0;

        if (bonusAmount > 0) {
          referrer.wallet.availableBalance += bonusAmount;
          referrer.wallet.totalEarnings += bonusAmount;
          await referrer.save();

          await WalletTransaction.create({
            userId: referrer._id,
            amount: bonusAmount,
            type: 'credit',
            source: 'referral_signup_bonus',
            status: 'completed'
          });

          try {
            const { createNotification } = require('./notificationController');
            await createNotification(
              referrer._id, 
              "Referral Signup Bonus! 🎉", 
              `${updatedUser.name} just joined Amazon Smarts using your link. ₹${bonusAmount} has been added to your wallet!`, 
              "success", 
              "/wallet"
            );
          } catch(err) { console.log('Notification error'); }
        }
      }
    }
    // ==============================================

    res.status(200).json({
      _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email,
      role: updatedUser.role, myReferralCode: updatedUser.myReferralCode,
      token: generateToken(updatedUser._id),
    });

  } catch (error) {
    res.status(500).json({ message: 'Verification error', error: error.message });
  }
};

// 3. LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Please verify your email.', requiresVerification: true });
      }

      res.json({
        _id: user._id, name: user.name, email: user.email,
        role: user.role, myReferralCode: user.myReferralCode,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
};

// 4. SEND OTP ONLY
exports.sendOtpOnly = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; 

    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        name: 'Guest Customer', email: email, password: Math.random().toString(36).slice(-8) + 'A1@', 
        myReferralCode: await generateUniqueReferralCode(), isVerified: false, otp, otpExpiry
      });
    } else {
      user.otp = otp; user.otpExpiry = otpExpiry; await user.save();
    }

    const message = getBrandedOtpTemplate("Your Checkout Verification Code", "Please use the following OTP to securely complete your order on Amazon Smarts:", otp);
    try { await sendEmail({ email: user.email, subject: 'Your Checkout OTP', message }); } catch (emailError) { console.log(`[FALLBACK] Checkout OTP is: ${otp}`); }

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server error sending OTP', error: error.message });
  }
};

// 5. SEND FORGOT PASSWORD OTP
exports.sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No account found with that email address." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp; user.otpExpiry = Date.now() + 10 * 60 * 1000; await user.save();

    const message = getBrandedOtpTemplate("Password Reset Request", "We received a request to reset the password for your Amazon Smarts account. If you initiated this request, please use the OTP below:", otp);
    try { await sendEmail({ email: user.email, subject: 'Amazon Smarts - Password Reset OTP', message }); } catch (emailError) { console.log(`[FALLBACK] Forgot Password OTP is: ${otp}`); }

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) { res.status(500).json({ message: "Server error." }); }
};

// 6. RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP. Please check the code and try again." });
    if (Date.now() > user.otpExpiry) return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    if (newPassword.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters long." });

    user.password = newPassword; user.otp = undefined; user.otpExpiry = undefined; await user.save();

    res.status(200).json({ message: "Password reset successful! You can now log in." });
  } catch (error) { res.status(500).json({ message: "Server error resetting password." }); }
};

// 7. RESEND REGISTRATION OTP
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "Account is already verified. Please go to login." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp; user.otpExpiry = Date.now() + 10 * 60 * 1000; await user.save();

    const message = getBrandedOtpTemplate("Verify your email address", `Hello <strong>${user.name}</strong>,<br><br>You requested a new code. Your new OTP for account verification is:`, otp);
    try { await sendEmail({ email: user.email, subject: 'New OTP - Verify Your Amazon Smarts Account', message }); } catch (emailError) { console.log(`[FALLBACK] Resend OTP is: ${otp}`); }

    res.status(200).json({ message: "A new OTP has been sent to your email." });
  } catch (error) { res.status(500).json({ message: 'Server error resending OTP', error: error.message }); }
};

// ==========================================
// 🚀 8. ADMIN: GET GLOBAL SETTINGS
// ==========================================
exports.getSettings = async (req, res) => {
  try {
    let config = await Setting.findOne();
    if (!config) config = await Setting.create({ signupBonus: 0 });
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings" });
  }
};

// ==========================================
// 🚀 9. ADMIN: UPDATE GLOBAL SETTINGS
// ==========================================
exports.updateSettings = async (req, res) => {
  try {
    const { signupBonus } = req.body;
    let config = await Setting.findOne();
    
    if (!config) {
      config = await Setting.create({ signupBonus: Number(signupBonus) });
    } else {
      config.signupBonus = Number(signupBonus);
      await config.save();
    }
    
    res.status(200).json({ message: "Settings updated successfully", config });
  } catch (error) {
    res.status(500).json({ message: "Error updating settings" });
  }
};