// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');  // Ensure correct path

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

// Use the auth routes
app.use('/api/auth', authRoutes);  // Prefix the routes with '/api/auth'
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
