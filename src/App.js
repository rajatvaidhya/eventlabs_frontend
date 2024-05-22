import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventPage from "./pages/EventPage";
import CityPage from "./pages/CityPage";
import ReactGA from "react-ga";
import CityServicePage from "./pages/CityServicePage";

const TrackingID = "G-X2BLP24B8K";
ReactGA.initialize(TrackingID);

function App() {

  // const ENDPOINT = "http://localhost:5000";
  // const ENDPOINT = "https://eventlabs-backend.onrender.com";
  const ENDPOINT = "https://eventlabs-backend.vercel.app"

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
            <Route path="/city/:cityinfo" element={<CityPage backendURL={ENDPOINT}/>} />
            <Route path="/city-service/:cityinfo/:serviceName/:latitude/:longitude" element={<CityServicePage backendURL={ENDPOINT}/>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
