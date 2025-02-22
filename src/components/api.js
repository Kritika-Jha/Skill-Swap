import axios from 'axios';
export const fetchQuestions = (skill) => axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/questions/${skill}`);
export const submitQuiz = (data) => axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/submit`, data);
