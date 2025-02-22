import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";
import Header from "./Header";
import Footer from "./Footer";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const loggedInUserId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [newLearningSkill, setNewLearningSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [timeCredits, setTimeCredits] = useState(50);

  const isOwnProfile = userId === loggedInUserId;

  useEffect(() => {
    if (!userId) {
      console.error("❌ No user ID found. Redirecting...");
      navigate("/login");
      return;
    }
  
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/${userId}`)
      .then((res) => {
        if (!res.data) {
          console.error("❌ No user data received.");
          return;
        }
  
        setUser({
          ...res.data,
          skills: res.data.skills || [],
          learningSkills: res.data.learningSkills || [],
          about: res.data.about || "",
        });
        setTimeCredits(res.data.timeCredits || 50);
      })
      .catch((err) => {
        console.error("❌ Error fetching profile:", err);
        navigate("/login"); // Redirect if fetching fails
      });
  }, [userId, navigate]);
  

  const addLearningSkill = () => {
    if (!newLearningSkill.trim()) return;

    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/add-learning-skill`, { userId, skill: newLearningSkill })
      .then((res) => setUser((prev) => ({
        ...prev,
        learningSkills: res.data.learningSkills || [],
      })))
      .catch((err) => console.error("❌ Error adding learning skill:", err));

    setNewLearningSkill("");
  };

  const removeLearningSkill = (skillToRemove) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/remove-learning-skill`, { userId, skill: skillToRemove })
      .then((res) => setUser((prev) => ({
        ...prev,
        learningSkills: res.data.learningSkills || [],
      })))
      .catch((err) => console.error("❌ Error removing skill:", err));
  };

  const updateProfile = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/update-profile`, {
        userId,
        name: user.name,
        email: user.email,
        about: user.about,
        learningSkills: user.learningSkills,
      })
      .then((res) => {
        console.log("✅ Profile updated:", res.data);
        setUser((prevUser) => ({
          ...prevUser,
          about: res.data.about || prevUser.about,
          learningSkills: res.data.learningSkills || prevUser.learningSkills,
        }));
        setIsEditing(false);
      })
      .catch((err) => console.error("❌ Error updating profile:", err));
  };

  if (!user)
    return (
      <div className="profile-container">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div className="profile">
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <h2>👤 {isEditing ? "Edit Profile" : `${user.name}'s Profile`}</h2>
        </div>
        <div className="profile-details">
          <label>📧 Email:</label>
          <p>{user.email}</p>
          <label>📝 About Me:</label>
          {isEditing ? (
            <textarea
              value={user.about}
              onChange={(e) => setUser({ ...user, about: e.target.value })}
            />
          ) : (
            <p>{user.about || "No additional information."}</p>
          )}
        </div>
        <div className="time-credit-section">
          <h3>⏳ Time Credits: {timeCredits}</h3>
        </div>
        <div className="skills-header">
          <h3>📖 Teaching Skills</h3>
          {isOwnProfile && (
            <button className="edit-skills-button" onClick={() => navigate("/skills")}>
              ✏️ Edit
            </button>
          )}
        </div>
        <ul className="skill-list">
          {user.skills?.length > 0 ? (
            user.skills.map((s, i) => (
              <li key={i} className="skill-item">
                {s.skillName} ({s.rating})
              </li>
            ))
          ) : (
            <p>No skills added.</p>
          )}
        </ul>
        <h3>🎯 Learning Skills</h3>
        <ul className="skill-list">
          {user.learningSkills?.length > 0 ? (
            user.learningSkills.map((s, i) => (
              <li key={i} className="skill-item">
                {s} {isEditing && (
                  <button className="delete-skill" onClick={() => removeLearningSkill(s)}>
                    ❌
                  </button>
                )}
              </li>
            ))
          ) : (
            <p>No learning skills added.</p>
          )}
        </ul>
        {isEditing && (
          <div className="edit-profile-section">
            <input
              type="text"
              placeholder="Add skill to learn..."
              value={newLearningSkill}
              onChange={(e) => setNewLearningSkill(e.target.value)}
            />
            <button onClick={addLearningSkill}>➕ Add</button>
          </div>
        )}
        {isOwnProfile && (
          <button className="edit-button" onClick={isEditing ? updateProfile : () => setIsEditing(true)}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
