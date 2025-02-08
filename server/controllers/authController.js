const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Ensure correct path to User model

exports.signup = async (req, res) => {
  console.log("Signup Route Hit", req.body); // Debugging

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
    console.log("User Saved Successfully:", newUser);

    res.status(201).json({ success: true, message: 'User created successfully!' });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  console.log("Login Route Hit", req.body); // Debugging

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

    res.status(200).json({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
};
