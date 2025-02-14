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
// const allowedOrigins = [
//   'https://skill-swap-web.vercel.app', // Your frontend URL
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // Allow the origin
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers like Content-Type and Authorization
//   credentials: true, // Allow credentials if required (e.g., cookies)
// };

// Apply CORS middleware
//app.use(cors(corsOptions));

// Manually set CORS headers for every request
app.use((req, res, next) => {
  // Set the CORS headers here
  res.setHeader('Access-Control-Allow-Origin', 'https://skill-swap-web.vercel.app');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE');
  
  // If the request is a preflight OPTIONS request, return immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next(); // Continue to the next middleware or route handler
});

// Parse incoming JSON
app.use(express.json());

// Handle preflight requests for all routes
app.options('*', cors(corsOptions)); // Explicitly handle preflight OPTIONS requests

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 SkillSwap API is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));