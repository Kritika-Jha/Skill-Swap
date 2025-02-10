import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./QuizPage.css";

// 📝 Import the question bank
import { questionBank } from "../data/questionBank";

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

  useEffect(() => {
    if (!userId) {
      console.error("❌ User ID missing, redirecting to login...");
      navigate("/login");
      return;
    }
  
    console.log("🔹 Skill Name from URL:", skillName);
  
    if (!skillName) {
      console.error("❌ skillName is undefined! Redirecting to skills page...");
      navigate("/skills"); // Redirect user if skillName is missing
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
  

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      setQuizCompleted(true);
      updateSkillRating();
    }
  };

  const updateSkillRating = async () => {
    try {
      const rating = score === 3 ? "Expert" : score === 2 ? "Intermediate" : "Beginner";
      await axios.post("http://localhost:5000/api/user/update-skill", { userId, skillName, rating });
      console.log("✅ Skill rating updated:", rating);
    } catch (err) {
      console.error("❌ Error updating skill rating:", err);
    }
  };

  return (
    <div className="quiz-container">
      {!quizCompleted ? (
        questions.length > 0 ? (
          <div id="quiz-content">
            <h2 id="quiz-title">{skillName} Quiz</h2>
            <p id="question-text">{questions[currentQuestionIndex].question}</p>
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
          <button id="return-button" onClick={() => navigate("/skills")}>Return to Skills</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
