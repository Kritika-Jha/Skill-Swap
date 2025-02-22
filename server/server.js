const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Correct CORS Configuration
const corsNewOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1', 'https://skill-swap-frontend-adnu.onrender.com', 'https://onrender.com', 'localhost', 'https://localhost', 'http://localhost'], // Allowed domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If using cookies or authentication
};

// Apply CORS middleware
app.use(cors(corsNewOptions)); // ✅ FIXED: Use corsNewOptions

// Parse incoming JSON
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 SkillSwap API is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
