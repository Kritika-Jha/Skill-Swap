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
<<<<<<< HEAD
  origin: ['http://localhost:3000', 'http://127.0.0.1'], // Allowed domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If using cookies or authentication
=======
  origin: ['https://skill-swap-web.vercel.app', 'http://localhost:3000', 'http://127.0.0.1'] /** all Allowed Domains for CORS */
>>>>>>> add9345185e0d77ff8a46303b9c407795a6489e4
};

// Apply CORS middleware
<<<<<<< HEAD
app.use(cors(corsNewOptions)); // ✅ FIXED: Use corsNewOptions
=======
//app.use(cors(corsOptions));
>>>>>>> add9345185e0d77ff8a46303b9c407795a6489e4

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
