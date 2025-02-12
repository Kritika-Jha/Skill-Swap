import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MatchPage.css";

const MatchPage = () => {
  const userId = localStorage.getItem("userId");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/user/match/${userId}`)
      .then((res) => setMatches(res.data.matches))
      .catch((err) => console.error("Error fetching matches:", err));
  }, []);

  return (
    <div className="match-container">
      <h2>🔗 Recommended Matches</h2>
      {matches.length > 0 ? (
        matches.map((match) => (
          <div key={match.id} className="match-card">
            <h3>{match.name}</h3>
            <p>📧 {match.email}</p>
            <p>🎓 Can Teach: {match.canTeach.join(", ")}</p>
            <p>📖 Wants to Learn: {match.wantsToLearn.join(", ")}</p>
          </div>
        ))
      ) : (
        <p>No suitable matches found.</p>
      )}
    </div>
  );
};

export default MatchPage;
