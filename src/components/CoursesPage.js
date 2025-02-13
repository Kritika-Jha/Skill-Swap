import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CoursesPage.css";
import Header from './Header';
import Footer from './Footer';


const CoursesPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [matches, setMatches] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

  }, [userId]);

  return (
    <div className="main-page">
      <Header />
      <div className="content">
        <section className="courses">
          <h1>Our Courses</h1>
          <p>
            At SkillSwap we have many free and premium courses available. Check them out below -
          </p>
        </section>
        <section className="courseList">
            <button className="accordion">Full-Stack Web Development</button>
            <div className="panel">
                <p>Learn to build modern web applications from front-end to back-end. This course covers HTML, CSS, JavaScript, Node.js, React, and databases, equipping developers to create dynamic and scalable websites.</p>
                <div className="purchase" onClick={() => navigate("/courses/success")}>Enroll Now</div>
            </div>

            <button className="accordion">Cloud Computing for Developers</button>
            <div className="panel">
                <p>Understand cloud architecture, services, and deployment strategies. This course teaches using AWS, Google Cloud, and Azure, helping developers build scalable applications with cloud infrastructure.</p>
                <div className="purchase" onClick={() => navigate("/courses/success")}>Enroll Now</div>
            </div>

            <button className="accordion">Mobile App Development with React Native</button>
            <div className="panel">
                <p>Dive into mobile app development using React Native. Learn to build cross-platform apps for iOS and Android with a single codebase, enhancing productivity and reach.</p>
                <div className="purchase" onClick={() => navigate("/courses/purchase")}>Buy Now</div>
            </div>

            <button className="accordion">DevOps Fundamentals for Developers</button>
            <div className="panel">
                <p>Explore DevOps principles to improve collaboration, automation, and continuous delivery. This course focuses on CI/CD pipelines, Docker, Kubernetes, and monitoring tools to streamline development and deployment processes.</p>
                <div className="purchase" onClick={() => navigate("/courses/purchase")}>Buy Now</div>
            </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;
