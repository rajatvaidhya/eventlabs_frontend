import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InterestPage from "./pages/InterestPage";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import ChatRoulette from "./components/ChatRoulette";
import { LightModeProvider } from "./contexts/LightModeContext";
import CreateEvent from "./pages/CreateEvent";

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
            <Route path="/chat/:roomId" element={<ChatRoulette />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </Router>
      </div>
    </LightModeProvider>
  );
}

export default App;
