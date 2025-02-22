import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Ensure this file exists

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
  
      const data = await response.json();
      console.log("📥 Server Response:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
  
      // ✅ Store userId in localStorage
      localStorage.setItem("userId", data.user._id); // Ensure backend sends userId
  
      alert("✅ Signup successful!");
      navigate("/mainPage", { replace: true }); // Redirect to skills-prompt
    } catch (error) {
      console.error("❌ SignUp error:", error.message);
      alert("Signup failed: " + error.message); // Show the error
    }
  };
  
  

  return (
    <div className="auth-container">
      <div className="left-content">
        <h2>Create an Account</h2>
        <h4>Start your journey today!!</h4>
        <p>Grow together</p>
      </div>

      <div className="right-content">
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
