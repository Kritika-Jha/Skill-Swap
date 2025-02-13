import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const userId = localStorage.getItem("userId");

  return (
    <div className="header">
      <div className="logo">
        <img src="/image/logo.png" alt="logo" />
      </div>
      <div className="links">
        <Link to="/mainPage">Home</Link>
        <Link to="/mainPage">About</Link>
        <Link to={userId ? `/profile/${userId}` : "/login"}>Profile</Link>
        <Link to="/matches">Recommended4U</Link>
        <Link to="/courses">Courses</Link>
      </div>
    </div>
  );
};

export default Header;
