import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./QuizPage.css";

// 📝 Import the question bank
import { questionBank } from "../data/questionBank";
import Header from "./Header";
import Footer from "./Footer";

const QuizPage = () => {
  const navigate = useNavigate();
  const { skillName } = useParams();
  const userId = localStorage.getItem("userId");

  // 🏆 Quiz State
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // ⏳ Timer (30 sec per question)

  useEffect(() => {
    if (!userId) {
      console.error("❌ User ID missing, redirecting to login...");
      navigate("/login");
      return;
    }

    console.log("🔹 Skill Name from URL:", skillName);

    if (!skillName) {
      console.error("❌ skillName is undefined! Redirecting to skills page...");
      navigate("/skills");
      return;
    }

    // Normalize skill name to match questionBank keys
    const normalizedSkillName = Object.keys(questionBank).find(
      (key) => key.toLowerCase() === skillName.toLowerCase()
    );

    if (!normalizedSkillName) {
      console.error("❌ No questions found for skill:", skillName);
      return;
    }

    console.log("✅ Skill Questions Loaded:", questionBank[normalizedSkillName]);

    // Shuffle & pick 3 questions
    const shuffledQuestions = questionBank[normalizedSkillName]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setQuestions(shuffledQuestions);
  }, [skillName]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer(); // Auto-submit when timer reaches 0
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setTimeLeft(30); // ⏳ Reset timer for next question
    } else {
      setQuizCompleted(true);
      updateSkillRating();
    }
  };

  const updateSkillRating = async () => {
    try {
      const totalQuestions = questions.length; // Dynamically get the total number of questions

      // Calculate the thresholds
      const intermediateThreshold = Math.ceil(totalQuestions * 0.66); // 66% of total questions
      const expertThreshold = totalQuestions; // 100% of total questions

      // Determine the rating based on the score
      let rating;
      if (score === expertThreshold) {
        rating = "Expert"; // User answered all questions correctly
      } else if (score >= intermediateThreshold) {
        rating = "Intermediate"; // User scored at least 66%
      } else {
        rating = "Beginner"; // User scored less than 66%
      }
      
      console.log(rating); // Output the rating

      await axios.post("https://skill-swap-u2xd.onrender.com/api/user/update-skill", {
        userId,
        skillName,
        rating,
      });
      console.log("✅ Skill rating updated:", rating);
    } catch (err) {
      console.error("❌ Error updating skill rating:", err);
    }
  };

  return (
    <div className="quiz">
      <Header />
      <div className="quiz-container">
        {!quizCompleted ? (
          questions.length > 0 ? (
            <div id="quiz-content">
              <h2 id="quiz-title">📚 {skillName} Quiz</h2>

              {/* Timer Bar */}
              <div className="timer-bar">
                <div className="timer-progress" style={{ width: `${(timeLeft / 30) * 100}%` }}></div>
              </div>
              <p className="timer-text">⏳ {timeLeft} sec</p>

              {/* Question */}
              <p id="question-text">{questions[currentQuestionIndex].question}</p>

              {/* Answer Options */}
              <div className="quiz-options">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    className={`quiz-option ${selectedAnswer === option ? "selected" : ""}`}
                    onClick={() => setSelectedAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button id="next-question" onClick={handleAnswer} disabled={!selectedAnswer}>
                {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          ) : (
            <p id="loading-message">⚠️ No Questions Available for {skillName}. Please try another skill.</p>
          )
        ) : (
          <div id="quiz-result">
            <h2>🎉 Quiz Completed!</h2>
            <p>Your Score: {score}/{questions.length}</p>
            <button id="return-button" onClick={() => navigate("/skills")}>
              Return to Skills
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default QuizPage;
