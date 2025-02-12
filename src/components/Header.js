import React from 'react';
import './Header.css'; // Ensure this CSS file exists for styling

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src="/image/logo.png" alt="logo" />
      </div>
      <div className="links">
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Home</a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">About</a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Courses</a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Profile</a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Contact</a>
      </div>
    </div>
  );
};

export default Header;
