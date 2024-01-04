import React from "react";
import "./FirstNav.css";
import { Link, useNavigate } from "react-router-dom";

const FirstNav = () => {

  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('roomId');
    localStorage.removeItem('username')
    localStorage.removeItem('latitude')
    localStorage.removeItem('longitude')
    navigate(`/`);
  }

  const setLiveLocation = async (event) => {

    const [longitude, latitude] = event.target.value.split(',').map(Number);


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
    <div className="main-first-nav">
      <div className="location-input">
        <p>
          <i className="fa-solid fa-location-dot"></i> Select location{" "}
        </p>
        <select onChange={setLiveLocation}>
          <option>Location</option>
        <option value="77.2090,28.6139">Delhi</option>
        <option value="75.8573,22.7196">Indore</option>
        <option value="80.9462,26.8467">Lucknow</option>
        </select>
      </div>

      <div className="first-nav-other-info">
        <p><Link to="/create-event">List your business</Link> | </p>
        <p onClick={handleLogout} className="logout-text"> &nbsp;Logout</p>
      </div>
    </div>
  );
};

export default FirstNav;
