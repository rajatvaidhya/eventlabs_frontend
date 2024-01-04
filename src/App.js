import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
// import UserProfile from "./pages/UserProfile";
import EventPage from "./pages/EventPage";

function App() {
  return (
      <div className="main-app">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/interest-select" element={<InterestPage />} /> */}
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/create-event" element={<CreateEvent />} />
            {/* <Route path="/user/:userId" element={<UserProfile />} /> */}
            <Route path="/event/:eventId" element={<EventPage />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
