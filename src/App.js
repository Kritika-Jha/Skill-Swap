import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SkillsPage from "./components/SkillsPage";
import QuizPage from "./components/QuizPage";
import MatchPage from "./components/MatchPage";
import ProfilePage from "./components/ProfilePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/quiz/:skillName" element={<QuizPage />} />
        <Route path="/matches" element={<MatchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
