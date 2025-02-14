const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // ✅ Add JWT for authentication
const User = require('../models/User'); // Ensure correct path to User model
require('dotenv').config(); // ✅ Load environment variables

exports.signup = async (req, res) => {
  console.log("✅ Signup Route Hit", req.body); // Debugging

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required!' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    console.log("✅ User Saved Successfully:", newUser);

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // ✅ Send `_id` and token in the response
    res.status(201).json({ 
      success: true, 
      message: 'User created successfully!',
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },  
      token  
    });

  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  console.log("✅ Login Route Hit", req.body); // Debugging

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required!' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials!' });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // ✅ Send `_id` and token in the response
    res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      user: { _id: user._id, name: user.name, email: user.email },  
      token  
    });

  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
};
