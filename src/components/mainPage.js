import React, { useState } from 'react';
import './mainPage.css';
import Header from './Header';
import Footer from './Footer';

const MainPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="main-page">
      <Header />
      <div className="content">
        <section className="about">
          <h1>About Us</h1>
          <p>
            Welcome to <strong>SkillSwap</strong>, a unique learning and teaching platform
            where knowledge meets collaboration. Whether you're looking to master a
            new skill or share your expertise, our community-driven approach makes
            learning more accessible and rewarding.
          </p>

          <p>
            At SkillSwap, we believe in the power of peer-to-peer learning. Our
            platform connects individuals based on their skills and interests,
            enabling them to exchange knowledge in a meaningful way. No matter where
            you are in your learning journey, you can find mentors, take quizzes, and
            earn time credits to unlock new learning opportunities.
          </p>

          <p>
            Our goal is to create a supportive environment where learning is not
            limited by traditional boundaries. From coding and design to languages
            and business skills, SkillSwap fosters a space where everyone can grow
            together.
          </p>

          <p>
            Join us today and start your journey towards skill-building and knowledge
            sharing!
          </p>
        </section>

        <section className="guide">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <h3>📌 Profile Setup</h3>
              <p>
                Create your personalized profile by listing the skills you're willing
                to teach and the ones you want to learn. This helps in better
                matching and recommendations.
              </p>
            </div>
            <div className="step">
              <h3>📝 Take Skill Quizzes</h3>
              <p>
                Validate your skills by taking short quizzes designed to assess your
                expertise. Your score will determine your proficiency level, making
                it easier to match with the right learners.
              </p>
            </div>
            <div className="step">
              <h3>🤖 AI Matching</h3>
              <p>
                Our smart AI system analyzes your skills and interests to help
                connect you with the most suitable learning partners and mentors.
              </p>
            </div>
            <div className="step">
              <h3>⏳ Earn Time Credits</h3>
              <p>
                For every hour you teach someone, you earn time credits. Use these
                credits to book learning sessions with others and expand your
                knowledge.
              </p>
            </div>
            <div className="step">
              <h3>📚 Explore Courses</h3>
              <p>Gain access to a variety of courses and get yourself certified!</p>
            </div>
            <div className="step">
              <h3>⭐ Leave Feedback</h3>
              <p>
                After each session, leave feedback for your learning partner. Your
                ratings and reviews help maintain quality and build a trustworthy
                learning community.
              </p>
            </div>
          </div>
        </section>

        <section className="contact">
          <h2>Contact Us</h2>
          <p>Have questions or feedback? Reach out!</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
