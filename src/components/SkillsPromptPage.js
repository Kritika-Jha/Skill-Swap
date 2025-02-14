import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SkillsPromptPage = () => {
  const navigate = useNavigate();
  const [learningSkills, setLearningSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for user ID
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("❌ No user ID found. Redirecting...");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/user/${userId}`)
        .then((res) => {
          setUser(res.data);
          setLearningSkills(res.data.learningSkills || []);
        })
        .catch((err) => console.error("❌ Error fetching user:", err));
    }
  }, [userId]);

  const addSkill = () => {
    if (newSkill.trim() !== "" && !learningSkills.includes(newSkill)) {
      setLearningSkills([...learningSkills, newSkill]);
      setNewSkill("");
    }
  };

  const saveLearningSkills = async () => {
    if (!userId) {
      console.error("❌ No user ID found.");
      return;
    }

    try {
      // Send each skill one by one to ensure it's saved properly
      for (const skill of learningSkills) {
        await axios.post("http://localhost:5000/api/user/add-learning-skill", {
          userId,
          skill, // Sending individual skills as per backend requirements
        });
      }

      console.log("✅ Learning skills saved successfully.");
      
      // Navigate to /skills for adding teaching skills
      navigate("/skills");

    } catch (error) {
      console.error("❌ Error saving skills:", error);
    }
  };

  return (
    <div className="skills-prompt-container">
      <h1>👋 Welcome, {user?.name || "Learner"}!</h1>
      <p>Let's start by adding the skills you'd like to learn.</p>

      <div className="learning-section">
        <h3>📚 Skills You Want to Learn</h3>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button onClick={addSkill}>➕ Add</button>
        </div>
        <ul>
          {learningSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <button onClick={saveLearningSkills} disabled={learningSkills.length === 0}>
          ✅ Save & Proceed to Teaching Skills
        </button>
      </div>
    </div>
  );
};

export default SkillsPromptPage;
