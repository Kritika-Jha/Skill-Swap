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

// CORS Setup to allow only the frontend URL
const allowedOrigins = ['https://skill-swap-web.vercel.app'];  // Add your frontend URL here
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));  // Apply the CORS options

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('🚀 SkillSwap API is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
