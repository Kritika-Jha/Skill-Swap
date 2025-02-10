const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

// ✅ Get User Skills (Fixes "Cannot GET /api/user/null" issue)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ skills: user.skills || [] }); // ✅ Always return an array
  } catch (err) {
    console.error("❌ Error fetching skills:", err);
    res.status(500).json({ error: "Server Error", skills: [] }); // ✅ Always return an array
  }
});

// ✅ Add a new skill (Fixes skill replacement issue)
router.post("/add-skill", async (req, res) => {
  try {
    const { userId, skill } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Ensure skills array exists
    if (!Array.isArray(user.skills)) {
      user.skills = [];
    }

    // ✅ Append skill without overwriting existing ones
    if (!user.skills.some((s) => s.skillName === skill)) {
      user.skills.push({ skillName: skill, rating: "Not Taken" });
      await user.save();
    }

    res.json({ success: true, skills: user.skills });
  } catch (err) {
    console.error("❌ Error adding skill:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Update Skill Rating After Quiz
router.post("/update-skill", async (req, res) => {
  try {
    const { userId, skillName, rating } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Check if the user has this skill, update its rating
    const skillIndex = user.skills.findIndex((s) => s.skillName === skillName);
    if (skillIndex !== -1) {
      user.skills[skillIndex].rating = rating; // ✅ Update rating
      await user.save();
      return res.json({ success: true, message: "Skill rating updated!", skills: user.skills });
    } else {
      return res.status(404).json({ error: "Skill not found" });
    }
  } catch (err) {
    console.error("❌ Error updating skill rating:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
