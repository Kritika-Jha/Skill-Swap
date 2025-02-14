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
  'https://skill-swap-web.vercel.app', // Your deployed frontend URL
  'http://localhost:3000'             // For local development
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers like Content-Type and Authorization
  credentials: true, // Allow credentials if required (e.g., cookies)
};

// Enable CORS for all requests
app.use(cors({ 
  origin: "https://skill-swap-web.vercel.app/", // Allow requests from your frontend
  methods: "GET,POST,PUT,DELETE", // Allowed request methods
  credentials: true // Allow sending cookies if needed
}));
// Apply CORS middleware
app.use(cors(corsOptions));

// Parse incoming JSON
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 SkillSwap API is Running!');
});

// Handle preflight requests for CORS
app.options('*', cors(corsOptions)); // Explicitly handle preflight OPTIONS requests

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
