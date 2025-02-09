const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // Specific error handling for common MongoDB issues
    if (error.message.includes('bad auth')) {
      console.error('⚠️ Check your MongoDB username/password.');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('⚠️ Cannot reach MongoDB. Ensure it is running.');
    } else if (error.message.includes('whitelist')) {
      console.error('⚠️ IP not whitelisted in MongoDB Atlas. Add it in Network Access.');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
