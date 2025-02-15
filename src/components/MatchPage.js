import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MatchPage.css";
import Header from "./Header";
import Footer from "./Footer";

const MatchPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [matches, setMatches] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/user/match/${userId}`)
      .then((res) => setMatches(res.data.matches || []))
      .catch((err) => console.error("❌ Error fetching matches:", err));
  }, [userId]);

  const openProfilePreview = (profile) => {
    setSelectedProfile(profile);
    if (modalRef.current) {
      modalRef.current.style.display = "block";
    }
  };

  const closeProfilePreview = () => {
    setSelectedProfile(null);
    if (modalRef.current) {
      modalRef.current.style.display = "none";
    }
  };

  return (
    <div className="main-page">
      <Header />
      <div className="match-container">
        <h2>🔗 Recommended Matches</h2>
        {matches.length > 0 ? (
          <div className="match-list">
            {matches.map((match) => (
              <div key={match.id} className="match-card">
                <h3>{match.name}</h3>
                <p>📧 {match.email}</p>
                <p>🎓 Can Teach: {match.canTeach.join(", ")}</p>
                <p>📖 Wants to Learn: {match.wantsToLearn.join(", ")}</p>
                <button className="view-profile-btn" onClick={() => openProfilePreview(match)}>
                  👀 View Profile
                </button>
                <button className="request-swap-btn">🔄 Request Swap</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No suitable matches found.</p>
        )}

        {selectedProfile && (
          <div ref={modalRef} className="profile-modal">
            <div className="profile-modal-content">
              <span className="close-btn" onClick={closeProfilePreview}>&times;</span>
              <h2>{selectedProfile.name}</h2>
              <p>📧 {selectedProfile.email}</p>
              <h4>🎓 Can Teach</h4>
              <ul>{selectedProfile.canTeach.map((skill, index) => <li key={index}>{skill}</li>)}</ul>
              <h4>📖 Wants to Learn</h4>
              <ul>{selectedProfile.wantsToLearn.map((skill, index) => <li key={index}>{skill}</li>)}</ul>
              <button className="view-full-profile-btn" onClick={() => navigate(`/profile/${selectedProfile.id}`)}>
                📄 View Full Profile
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>

  );
};

export default MatchPage;
