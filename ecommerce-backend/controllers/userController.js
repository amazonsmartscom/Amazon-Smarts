// // controllers/userController.js
// const User = require('../models/User');

// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password -otp -otpExpiry');
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Fetch Profile Error:", error);
//     res.status(500).json({ message: 'Server error fetching profile' });
//   }
// };

// exports.updateUserProfile = async (req, res) => {
//   try {
//     // 🚀 CRITICAL FIX: Extracting 'addresses' from the incoming frontend request
//     const { name, phone, addresses, bankDetails } = req.body;
    
//     const user = await User.findById(req.params.id);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update fields (Allowing empty arrays/strings to overwrite existing data if needed)
//     if (name !== undefined) user.name = name;
//     if (phone !== undefined) user.phone = phone;
//     if (addresses !== undefined) user.addresses = addresses; // 🚀 Assign the array
//     if (bankDetails !== undefined) user.bankDetails = bankDetails;

//     await user.save();
    
//     const updatedUser = await User.findById(req.params.id).select('-password -otp -otpExpiry');
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Update Profile Error:", error);
//     res.status(500).json({ message: 'Error updating profile' });
//   }
// };


// controllers/userController.js
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -otp -otpExpiry');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phone, addresses, bankDetails } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (addresses !== undefined) user.addresses = addresses; 
    if (bankDetails !== undefined) user.bankDetails = bankDetails;

    await user.save();
    
    const updatedUser = await User.findById(req.params.id).select('-password -otp -otpExpiry');
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// 🚀 NEW: Add a single address from Checkout Page
exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { street, city, state, pincode, country, phone } = req.body;

    user.addresses.push({ street, city, state, pincode, country });
    
    // Save phone number if they don't have one on profile yet
    if (!user.phone && phone) {
      user.phone = phone;
    }

    await user.save();
    res.status(200).json({ message: 'Address saved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error saving address', error: error.message });
  }
};