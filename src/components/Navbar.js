import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import DarkLogo from "../images/main-logo-png.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const Navbar = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const userId = localStorage.getItem("userId");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [search, setSearch] = useState(false);

  const navigate = useNavigate();

  const data = [
    "Events and Parties",
    "Electricians",
    "Spa and Salons",
    "Cleaning Services",
    "Flower and Decorations",
    "Marriage and Catering",
    "Plumbers",
    "Photographers",
    "Textile Services",
    "Pet Care Service",
    "Fitness Services",
    "Legal and Consultancy Services",
    "Medical Services",
  ];

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    const newSuggestions = data.filter((item) =>
      item.toLowerCase().includes(newSearchTerm)
    );
    setSuggestions(newSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const setLiveLocation = async () => {
    setLoading(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
      });
    }

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
      console.log("User location updated successfully");
      toast.success("Location set successfully.", {
        position: "top-center",
        theme: "colored",
      });
      setLoading(false);
      window.location.reload();
    } else {
      toast.error("Error updating location.", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  // const handleSetLocation = () => {
  //   setLoading(true);

  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       const { latitude, longitude } = position.coords;
  // localStorage.setItem("latitude", latitude);
  // localStorage.setItem("longitude", longitude);
  //       setLiveLocation(longitude, latitude);
  //     });
  //   } else {
  //     console.log("Location sharing isn't possible due to network issue!");
  //   }
  // };

  const handleSearch = () => {
    props.setSearchItem(searchTerm);
  };

  return (
    <>
      <div className="navbar">
        <div className="site-logo">
          <img src={DarkLogo} alt="Logo" />
        </div>

        {localStorage.getItem("token") ? (
          <div className="main-search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search nearby services"
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}

            <button className="nav-buttons" onClick={handleSearch}>
              {" "}
              <i className="fa-solid fa-search"></i> &nbsp;Search
            </button>
            <button
              className="nav-buttons"
              disabled={loading}
              onClick={setLiveLocation}
            >
              {loading ? (
                <div className="set-location-loader">
                  <Loader /> Setting Location
                </div>
              ) : (
                <div>
                  <i className="fa-solid fa-location-dot"></i> &nbsp; Set
                  current location
                </div>
              )}
            </button>
          </div>
        ) : (
          <button
            className="nav-buttons login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>

      {localStorage.getItem("token") ? (
        <div className="mobile-buttons">
          <button className="nav-buttons2" onClick={handleSearch}>
            <i className="fa-solid fa-search"></i> &nbsp;Search
          </button>

          <button className="nav-buttons2" onClick={setLiveLocation}>
            {loading ? (
              <div className="set-location-loader">
                <Loader /> Setting Location
              </div>
            ) : (
              <div>
                <i className="fa-solid fa-location-dot"></i> &nbsp; Set current
                location
              </div>
            )}
          </button>
        </div>
      ) : (
        ""
      )}

      <ToastContainer />
    </>
  );
};

export default Navbar;
