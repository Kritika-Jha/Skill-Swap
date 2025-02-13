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
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/courses">Courses</Link>
        <Link to={userId ? `/profile/${userId}` : "/login"}>Profile</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default Header;
