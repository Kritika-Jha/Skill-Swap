const express = require('express');
const Question = require('../models/Question');
const User = require('../models/User');

const router = express.Router();

// Get random quiz questions for a skill
router.get('/questions/:skill', async (req, res) => {
  try {
    const { skill } = req.params;
    const questions = await Question.aggregate([{ $match: { skill } }, { $sample: { size: 5 } }]);
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit quiz answers and update user rating
router.post('/submit', async (req, res) => {
  try {
    const { userId, skill, answers } = req.body;
    const questions = await Question.find({ skill });

    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) score++;
    });

    // Update user's skill rating
    const user = await User.findById(userId);
    const skillIndex = user.skills.findIndex(s => s.skillName === skill);
    
    if (skillIndex !== -1) {
      user.skills[skillIndex].rating = score;
    } else {
      user.skills.push({ skillName: skill, rating: score });
    }

    await user.save();

    res.json({ success: true, score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
