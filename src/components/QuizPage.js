import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions, submitQuiz } from './api';
import './QuizPage.css';

const QuizPage = () => {
  const { skill } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions(skill).then(res => setQuestions(res.data));
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [skill]);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    submitQuiz({ userId: '1234', skill, answers }).then(res => {
      alert(`Quiz Completed! Your Score: ${res.data.score}`);
      navigate('/profile');
    });
  };

  if (timeLeft <= 0) {
    handleSubmit();
  }

  return (
    <div className="quiz-container">
      <h2>Quiz for {skill}</h2>
      <p>Time Left: {timeLeft}s</p>
      {questions.map((q, i) => (
        <div key={i} className="question-box">
          <h3>{q.question}</h3>
          {q.options.map(opt => (
            <button key={opt} onClick={() => handleAnswer(i, opt)}>{opt}</button>
          ))}
        </div>
      ))}
      <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default QuizPage;
