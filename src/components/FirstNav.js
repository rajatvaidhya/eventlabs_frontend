import React, { useState } from "react";
import "./FirstNav.css";
import { Link, useNavigate } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";

const FirstNav = (props) => {
  const ENDPOINT = props.backendURL;
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roomId");
    localStorage.removeItem("username");
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
    navigate(`/`);
  };

  const setLiveLocation = async (event) => {
    setLoading(true);
    const [longitude, latitude] = event.target.value.split(",").map(Number);

    const response = await fetch(`${ENDPOINT}/api/chat/setLiveLocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userLocation: { longitude: longitude, latitude: latitude },
      }),
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <>
      {loading ? <FullScreenLoader /> : ""}
      <div className="main-first-nav">
        <div className="location-input">
          <p>
            <i className="fa-solid fa-location-dot"></i> Select location{" "}
          </p>
          <select onChange={setLiveLocation}>
            <option>Location</option>
            <option value="77.2090,28.6139">Delhi</option>
            <option value="75.8573,22.7196">Indore</option>
            <option value="77.4126,23.2599">Bhopal</option>
            <option value="79.9339,23.1686">Jabalpur</option>
            <option value="72.8777,19.0760">Mumbai</option>
            <option value="88.3639,22.5726">Kolkata</option>
            <option value="80.2707,13.0827">Chennai</option>
            <option value="80.9462,26.8467">Lucknow</option>
            <option value="73.8567,18.5204">Pune</option>
            <option value="77.5946,12.9716">Bangalore</option>
          </select>
        </div>

        <div className="first-nav-other-info">
          <p>
            <Link to="/create-event">List your business</Link> |{" "}
          </p>
          <p onClick={handleLogout} className="logout-text">
            {" "}
            &nbsp;Logout
          </p>
        </div>
      </div>
    </>
  );
};

export default FirstNav;
