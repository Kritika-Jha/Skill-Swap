const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Ensure correct path

// Check if authController methods exist before using them
if (!authController.signup || !authController.login) {
  console.error("❌ authController is missing required methods.");
} else {
  console.log("✅ authController loaded successfully.");
}

// Signup Route
router.post('/signup', authController.signup);

// Login Route
router.post('/login', authController.login);

module.exports = router;

