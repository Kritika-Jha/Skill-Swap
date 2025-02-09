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
    type: [{ skillName: String, rating: String }], // ✅ Ensure `skills` is an array of objects
    default: [],
  },
});

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
