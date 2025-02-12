import axios from 'axios';

const API_URL = 'http://localhost:5000/api/quiz';

export const fetchQuestions = (skill) => axios.get(`${API_URL}/questions/${skill}`);
export const submitQuiz = (data) => axios.post(`${API_URL}/submit`, data);
