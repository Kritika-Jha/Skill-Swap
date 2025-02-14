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
  const [newTeachingSkill, setNewTeachingSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [timeCredits, setTimeCredits] = useState(50); // Default 50

  const isOwnProfile = userId === loggedInUserId;

  useEffect(() => {
    if (!userId) {
      console.error("❌ No user ID found. Redirecting...");
      navigate("/login");
      return;
    }

    axios
      .get(`https://skill-swap-dbtv.onrender.com/api/user/${userId}`)
      .then((res) => {
        const fetchedUser = res.data;
        setUser({
          ...fetchedUser,
          skills: fetchedUser.skills || [],
          learningSkills: fetchedUser.learningSkills || [],
          about: fetchedUser.about || "",
        });
      })
      .catch((err) => console.error("❌ Error fetching profile:", err));
  }, [userId, navigate]);

  const addLearningSkill = () => {
    if (!newLearningSkill.trim()) return;

    axios
      .post("https://skill-swap-dbtv.onrender.com/api/user/add-learning-skill", {
        userId,
        skill: newLearningSkill,
      })
      .then((res) =>
        setUser((prev) => ({
          ...prev,
          learningSkills: res.data.learningSkills || [],
        }))
      )
      .catch((err) => console.error("❌ Error adding learning skill:", err));

    setNewLearningSkill("");
  };

  const removeLearningSkill = (skillToRemove) => {
    axios
      .post("https://skill-swap-dbtv.onrender.com/api/user/remove-learning-skill", {
        userId,
        skill: skillToRemove,
      })
      .then((res) =>
        setUser((prev) => ({
          ...prev,
          learningSkills: res.data.learningSkills || [],
        }))
      )
      .catch((err) => console.error("❌ Error removing skill:", err));
  };

  // const addTeachingSkill = () => {
  //   if (!newTeachingSkill.trim()) return;

  //   axios
  //     .post("http://localhost:5000/api/user/add-teaching-skill", {
  //       userId,
  //       skillName: newTeachingSkill,
  //       rating: 5, // Default rating (adjust if needed)
  //     })
  //     .then((res) =>
  //       setUser((prev) => ({
  //         ...prev,
  //         skills: res.data.skills || [],
  //       }))
  //     )
  //     .catch((err) => console.error("❌ Error adding teaching skill:", err));

  //   setNewTeachingSkill("");
  // };

  // const removeTeachingSkill = (skillId) => {
  //   axios
  //     .post("http://localhost:5000/api/user/remove-teaching-skill", {
  //       userId,
  //       skillId,
  //     })
  //     .then((res) =>
  //       setUser((prev) => ({
  //         ...prev,
  //         skills: res.data.skills || [],
  //       }))
  //     )
  //     .catch((err) => console.error("❌ Error removing teaching skill:", err));
  // };

  const updateProfile = () => {
    axios
      .post("https://skill-swap-dbtv.onrender.com/api/user/update-profile", {
        userId,
        name: user.name,
        email: user.email,
        about: user.about, // Ensure 'about' is included
        learningSkills: user.learningSkills, // Ensure 'learningSkills' is included
      })
      .then((res) => {
        console.log("✅ Profile updated:", res.data); // Debugging
        setUser((prevUser) => ({
          ...prevUser,
          about: res.data.about || prevUser.about, // Fallback if 'about' is missing
          learningSkills: res.data.learningSkills || prevUser.learningSkills, // Fallback if missing
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

        {/* Time Credits */}
        <div className="time-credit-section">
          <h3>⏳ Time Credits: {timeCredits}</h3>
        </div>

        {/* Teaching Skills Section */}
        <div className="skills-header">
        <h3>📖 Teaching Skills</h3>
          {isOwnProfile && (
            <button
              className="edit-skills-button"
              onClick={() => navigate("/skills")}
            >
              ✏️ Edit
            </button>
          )}
        </div>
        <ul className="skill-list">
          {user.skills.length > 0 ? (
            user.skills.map((s, i) => (
              <li key={i} className="skill-item">
                {s.skillName} ({s.rating})
              </li>
            ))
          ) : (
            <p>No skills added.</p>
          )}
        </ul>
        {/* Learning Skills Section */}
        <h3>🎯 Learning Skills</h3>
        <ul className="skill-list">
          {user.learningSkills.length > 0 ? (
            user.learningSkills.map((s, i) => (
              <li key={i} className="skill-item">
                {s}{" "}
                {isEditing && (
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

        {/* Edit Button */}
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
