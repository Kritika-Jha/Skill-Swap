import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
<<<<<<< HEAD
import MainPage from "./components/mainPage";
=======
import SkillsPage from "./components/SkillsPage";  // New Skills Page
import QuizPage from "./components/QuizPage";
>>>>>>> dd17ba1e2a007df4b259dd3e202f8abbdb8e593f

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
        <Route path="/mainPage" element={<MainPage />} />
=======
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/quiz/:skillName" element={<QuizPage />} />
>>>>>>> dd17ba1e2a007df4b259dd3e202f8abbdb8e593f
      </Routes>
    </BrowserRouter>
  );
}

export default App;
