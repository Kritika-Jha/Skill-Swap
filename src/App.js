import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SkillsPage from "./components/SkillsPage";  // New Skills Page
import QuizPage from "./components/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/skills" element={<SkillsPage />} />  {/* New Route */}
        <Route path="/quiz/:skill" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
