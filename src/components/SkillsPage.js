import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SkillsPage.css";
import Header from "./Header";
import Footer from "./Footer";

const SkillsPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]); // ✅ Initialize as an empty array
  const [newSkill, setNewSkill] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing, redirecting to login...");
      navigate("/login");
      return;
    }

    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/${userId}`)
      .then(res => {
        console.log("✅ Skills fetched:", res.data);
        setSkills(res.data.skills || []); // ✅ Ensure it's always an array
      })
      .catch(err => {
        console.error("❌ Error fetching skills:", err);
        setSkills([]); // ✅ Set empty array on error to prevent crash
      });
  }, []);

  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (!userId) {
      alert("User ID is missing, please log in again.");
      navigate("/login");
      return;
    }

    axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/add-skill`, { userId, skill: newSkill })
      .then(res => {
        console.log("✅ Skill added successfully:", res.data);
        setSkills(res.data.skills || []); // ✅ Update UI with latest skills from backend
      })
      .catch(err => console.error("❌ Error adding skill:", err));

    setNewSkill("");
  };

  return (
    <div>
      <Header />
      <div className="skills-container" id="skills-page">
        <h2 id="skills-title">📚 Your Skills</h2>

        {/* 🔹 Skill Input Section */}
        <div className="add-skill-section" id="add-skill-container">
          <input 
            type="text" 
            id="skill-input"
            placeholder="Enter a skill..." 
            value={newSkill} 
            onChange={(e) => setNewSkill(e.target.value)} 
          />
          <button id="add-skill-button" onClick={addSkill}>➕ Add Skill</button>
        </div>

        {/* 🏆 Skills List */}
        <div className="skills-list" id="skills-list">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div key={index} className="skill-box" id={`skill-box-${index}`}>
                <h3 className="skill-name" id={`skill-name-${index}`}>{skill.skillName}</h3>
                <p className="skill-rating" id={`skill-rating-${index}`}>⭐ Rating: {skill.rating}</p>
                <button 
                  className="quiz-button" 
                  id={`quiz-button-${index}`} 
                  onClick={() => navigate(`/quiz/${skill.skillName}`)}
                >
                  {skill.rating === "Not Taken" ? "Take Quiz" : "Retake Quiz"}
                </button>
              </div>
            ))
          ) : (
            <p id="no-skills-message">No skills added yet. Start by adding one above! 🚀</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SkillsPage;
