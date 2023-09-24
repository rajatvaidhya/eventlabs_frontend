import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InterestPage from "./pages/InterestPage";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import CreateEventModal from "./components/CreateEventModal";
import ChatRoulette from "./components/ChatRoulette";
import { LightModeProvider } from "./contexts/LightModeContext";

function App() {
  return (
    <LightModeProvider>
      <div className="main-app">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/interest-select" element={<InterestPage />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/create-event" element={<CreateEventModal />} />
            <Route path="/chat/:roomId" element={<ChatRoulette />} />
          </Routes>
        </Router>
      </div>
    </LightModeProvider>
  );
}

export default App;
