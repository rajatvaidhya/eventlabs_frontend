import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventPage from "./pages/EventPage";

function App() {

  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = "https://eventlabs-backend.onrender.com";

  return (
      <div className="main-app">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home backendURL={ENDPOINT}/>} />
            <Route path="/login" element={<Login backendURL={ENDPOINT}/>} />
            <Route path="/signup" element={<Signup backendURL={ENDPOINT}/>} />
            <Route path="/mainpage" element={<MainPage backendURL={ENDPOINT}/>} />
            <Route path="/create-event" element={<CreateEvent backendURL={ENDPOINT}/>} />
            <Route path="/event/:eventId" element={<EventPage backendURL={ENDPOINT}/>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
