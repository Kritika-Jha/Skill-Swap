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

// CORS Configuration
const allowedOrigins = [
  'https://skill-swap-web.vercel.app', // Your frontend URL
  'http://localhost:3000',            // For local development
];


const corsNewOptions = {
  origin: ['https://skill-swap-frontend.onrender.com', 'http://localhost', 'https://skill-swap-web.vercel.app', 'http://127.0.0.1'] /** all Allowed Domains for CORS */
};

app.use(cors(corsNewOptions));


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