import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/mainPage";
import SkillsPage from "./components/SkillsPage";
import QuizPage from "./components/QuizPage";
import MatchPage from "./components/MatchPage";
import ProfilePage from "./components/ProfilePage";
import CoursesPage from "./components/CoursesPage";
import CoursePurchasePage from "./components/CoursePurchasePage";
import SuccessPage from "./components/SuccessPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/quiz/:skillName" element={<QuizPage />} />
        <Route path="/matches" element={<MatchPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/purchase" element={<CoursePurchasePage />} />
        <Route path="/courses/success" element={<SuccessPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
