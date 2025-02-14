import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear user data
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="header">
      <div className="logo">
        <img src="/image/logo.png" alt="logo" />
      </div>
      <div className="links">
        <Link to="/mainPage">Home</Link>
        <Link to={userId ? `/profile/${userId}` : "/login"}>Profile</Link>
        <Link to="/matches">Recommended4U</Link>
        <Link to="/courses">Courses</Link>
        {userId && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default Header;
