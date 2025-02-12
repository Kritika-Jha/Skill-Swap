const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
    type: [{ skillName: String, rating: String }], // ✅ Teaching skills (from Skills Page)
    default: [],
  },
  learningSkills: {
    type: [String], // ✅ Skills the user wants to learn
    default: [],
  },
  interactions: {
    type: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }], // ✅ Future AI-based learning
    default: [],
  },
});

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
