// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

// জেনারেট টোকেন
const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
function generate6DigitId() {
  // Take the current timestamp in seconds, then take the last 6 digits
  const timestamp = Math.floor(Date.now() / 1000);
  const randomPart = Math.floor(Math.random() * 1000); // Generate a random number up to 999
  const uniqueId = (timestamp + randomPart) % 1000000; // Ensure it's a 6-digit number
  return uniqueId.toString().padStart(6, '0'); // Pad with leading zeros if needed
}
// রেজিস্ট্রেশন
// const registerUser = async (req, res) => {
//     const { name, email,number, address, bname, password, role } = req.body;
//     try {
//         const shortId = generate6DigitId();
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const user = await User.create({
//             _id:shortId,
//             name,
//             email,
//             number,
//             address,
//             bname,
//             password,
//             role,
//         });

//         const token = generateToken(user._id, user.role);

//         res.status(201).json({
//             token,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

const registerUser = async (req, res) => {
  const { name, email, number, address, bname, password, role } = req.body;

  try {
      const shortId = generate6DigitId(); // Generates a unique ID
      const userExists = await User.findOne({ email });

      if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // If the role is 'PickUp-Boy' or 'Delivery-Boy', `bname` is not needed
      const businessName = (role === 'PickUp-Boy' || role === 'Delivery-Boy') ? "" : bname;

      const user = await User.create({
          _id: shortId,
          name,
          email,
          number,
          address,
          bname: businessName, // Set empty if not applicable
          password,
          role,
      });

      const token = generateToken(user._id, user.role);

      res.status(201).json({
          token,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};


// // লগইন
 
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Compare passwords (assuming you're using bcrypt)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Generate JWT token with additional fields
      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          name: user.name,    // Include name
          email: user.email,  // Include email
          number: user.number,
          address: user.address,
          bname: user.bname,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: 'Login successful.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          number: user.number,
          address: user.address,
          bname: user.bname,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Server error during login.' });
    }
  };
  module.exports = { registerUser, loginUser };