import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from 'lottie-react';
import animationData from '../animations/animation1.json';  // Replace with your animation path
import "./LandingPage.css";

const taglines = ["Learn.", "Learn. Teach.", "Learn. Teach. Elevate."];

const LandingPage = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 1500); // Change tagline every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      {/* Left Section */}
      <div className="left-content">
        <div className="heading-container">
          <h1 className="tagloone-title">{taglines[taglineIndex]}</h1>
          <h2 className="skill-swap-title">SkillSwap</h2>
        </div>
        <p className="hero-description">
          SkillSwap is a barter-based learning platform where you can exchange skills instead of money.
        </p>
        <div className="cta-container">
          <Link to="/signup">
            <button className="cta-button">Start Learning for Free!</button>
          </Link>
        </div>
      </div>

      {/* Right Section - Lottie Animation */}
      <div className="right-content">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "50%", height: "50%" }}
        />
      </div>
    </div>
  );
};

export default LandingPage;