import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SuccessPage.css";
import Header from './Header';
import Footer from './Footer';


const SuccessPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [matches, setMatches] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    window.scrollTo(0, 0); // Scrolls to the top
  }, [userId]);

  return (
    <div className="main-page">
      <Header />
      <div className="content">
        <section className="courses">
          <h1>Congratulations!</h1>
          <p>
            You have been successfully enrolled to the requested course.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
