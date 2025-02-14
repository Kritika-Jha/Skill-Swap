const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Handle OPTIONS requests for /api/auth/login
// router.options('/login', (req, res) => {
//   res.header('Access-Control-Allow-Origin', 'https://skill-swap-web.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'POST');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.send();
// });
// router.options('/signup', (req, res) => {
//   res.header('Access-Control-Allow-Origin', 'https://skill-swap-web.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'POST');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.send();
// });
// Signup Route
router.post('/signup', authController.signup);

// Login Route
router.post('/login', authController.login);

module.exports = router;

