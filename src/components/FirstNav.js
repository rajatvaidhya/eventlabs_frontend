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

  const redirectCityPage = (event) => {
    const cityData = event.target.value.split(",");
    if (cityData.length === 3) {
      const [longitude, latitude, cityName] = cityData;
      navigate(`/city/${cityName}?lat=${latitude}&lon=${longitude}`);
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
          <select onChange={redirectCityPage}>
            <option value="">Location</option>
            <option value="77.2090,28.6139,Delhi">Delhi</option>
            <option value="75.8573,22.7196,Indore">Indore</option>
            <option value="77.4126,23.2599,Bhopal">Bhopal</option>
            <option value="79.9339,23.1686,Jabalpur">Jabalpur</option>
            <option value="72.8777,19.0760,Mumbai">Mumbai</option>
            <option value="88.3639,22.5726,Kolkata">Kolkata</option>
            <option value="80.2707,13.0827,Chennai">Chennai</option>
            <option value="80.9462,26.8467,Lucknow">Lucknow</option>
            <option value="73.8567,18.5204,Pune">Pune</option>
            <option value="77.5946,12.9716,Bangalore">Bangalore</option>
          </select>
        </div>

        <div className="first-nav-other-info">
          <p>
            <Link to="/create-event">List your business</Link>{" "}
          </p>

          {localStorage.getItem("token") ? (
            <p onClick={handleLogout} className="logout-text">
              &nbsp;| Logout
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default FirstNav;
