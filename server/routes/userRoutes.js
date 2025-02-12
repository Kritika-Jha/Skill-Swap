const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

// ✅ Get User Profile (Includes skills & learning skills)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: "Invalid user ID format" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      skills: user.skills || [],
      learningSkills: user.learningSkills || [],
    });
  } catch (err) {
    console.error("❌ Error fetching profile:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Add a New Teaching Skill
router.post("/add-skill", async (req, res) => {
  try {
    const { userId, skill } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: "Invalid user ID format" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

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
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: "Invalid user ID format" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const skillIndex = user.skills.findIndex((s) => s.skillName === skillName);
    if (skillIndex !== -1) {
      user.skills[skillIndex].rating = rating;
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

// ✅ Add a New Learning Skill
router.post("/add-learning-skill", async (req, res) => {
  try {
    const { userId, skill } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: "Invalid user ID format" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.learningSkills.includes(skill)) {
      user.learningSkills.push(skill);
      await user.save();
    }

    res.json({ success: true, learningSkills: user.learningSkills });
  } catch (err) {
    console.error("❌ Error adding learning skill:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Remove a Learning Skill
router.post("/remove-learning-skill", async (req, res) => {
  try {
    const { userId, skill } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: "Invalid user ID" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.learningSkills = user.learningSkills.filter((s) => s !== skill);
    await user.save();

    res.json({ success: true, learningSkills: user.learningSkills });
  } catch (err) {
    console.error("❌ Error removing skill:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Update Profile Information (Name, Email, About)
router.post("/update-profile", async (req, res) => {
  try {
    const { userId, name, email, about } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: "Invalid user ID" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name;
    user.email = email;
    user.about = about;
    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ error: "Server Error" });
  }
});


// ✅ Rule-Based Profile Matching (No Need for `matchRoutes.js`)
router.get("/match/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: "Invalid user ID format" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const allUsers = await User.find({ _id: { $ne: userId } });

    const matches = allUsers
      .map((otherUser) => {
        const canTeach = otherUser.skills.map((s) => s.skillName);
        const wantsToLearn = otherUser.learningSkills;

        const teachesWhatYouNeed = canTeach.some((skill) => user.learningSkills.includes(skill));
        const learnsWhatYouTeach = wantsToLearn.some((skill) => user.skills.map((s) => s.skillName).includes(skill));

        if (teachesWhatYouNeed || learnsWhatYouTeach) {
          return {
            id: otherUser._id,
            name: otherUser.name,
            email: otherUser.email,
            canTeach: canTeach.filter((s) => user.learningSkills.includes(s)),
            wantsToLearn: wantsToLearn.filter((s) => user.skills.map((s) => s.skillName).includes(s)),
          };
        }
        return null;
      })
      .filter((match) => match !== null);

    res.json({ success: true, matches });
  } catch (err) {
    console.error("❌ Error finding matches:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
