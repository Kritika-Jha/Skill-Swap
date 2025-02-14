import axios from 'axios';

const API_URL = 'https://skill-swap-u2xd.onrender.com';

export const fetchQuestions = (skill) => axios.get(`${API_URL}/questions/${skill}`);
export const submitQuiz = (data) => axios.post(`${API_URL}/submit`, data);
