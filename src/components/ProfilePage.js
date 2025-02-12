import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // ✅ Supports viewing other profiles
  const loggedInUserId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [newLearningSkill, setNewLearningSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const isOwnProfile = userId === loggedInUserId; // ✅ Allows editing only if it's your profile

  useEffect(() => {
    if (!userId) {
      console.error("❌ No user ID found. Redirecting...");
      navigate("/skills");
      return;
    }

    axios
      .get(`http://localhost:5000/api/user/${userId}`)
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
      .post("http://localhost:5000/api/user/add-learning-skill", {
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
      .post("http://localhost:5000/api/user/remove-learning-skill", {
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

  const updateProfile = () => {
    axios
      .post("http://localhost:5000/api/user/update-profile", {
        userId,
        name: user.name,
        email: user.email,
        about: user.about,
      })
      .then((res) => {
        setUser(res.data);
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
    <div className="profile-container">
      <div className="profile-header">
        <h2>👤 {isEditing ? "Edit Profile" : `${user.name}'s Profile`}</h2>
      </div>

      <div className="profile-details">
        <label>📧 Email:</label>
        {isEditing ? (
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        ) : (
          <p>{user.email}</p>
        )}

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

      <h3>📖 Teaching Skills</h3>
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

      <h3>🎯 Learning Skills</h3>
      <ul className="skill-list">
        {user.learningSkills.length > 0 ? (
          user.learningSkills.map((s, i) => (
            <li key={i} className="skill-item">
              {s}{" "}
              {isEditing && (
                <button
                  className="delete-skill"
                  onClick={() => removeLearningSkill(s)}
                >
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
        <button
          className="edit-button"
          onClick={isEditing ? updateProfile : () => setIsEditing(true)}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
