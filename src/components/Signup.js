import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Ensure this file exists
import axios from 'axios'; // Ensure axios is installed

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password
      });
  
      console.log("✅ Signup successful response:", response.data); // Debugging log
  
      if (response.data.user && response.data.user._id) {
        localStorage.setItem("userId", response.data.user._id);
        navigate('/mainPage');  
      } else {
        console.error("❌ Signup failed: user ID missing in response");
      }
    } catch (error) {
      console.error("❌ SignUp error:", error.response ? error.response.data : error.message);
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
