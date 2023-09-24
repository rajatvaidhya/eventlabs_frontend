import React from "react";
import "./Navbar.css";
import DarkLogo from "../images/Eventlabs__1_-removebg-preview.png";
import LightLogo from "../images/orilogo.png";
import { useNavigate } from "react-router-dom";
import { useLightMode } from "../contexts/LightModeContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { toggleLightMode, setToggleLightMode } = useLightMode();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roomId");
    localStorage.removeItem("longitude");
    localStorage.removeItem("latitude");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: toggleLightMode ? "#BEFFF7" : "black",
        color: toggleLightMode ? "black" : "white",
      }}
    >
      <div style={{ height: "100px", width: "100px" }}>
        {toggleLightMode ? (
          <img src={LightLogo} alt="Logo" />
        ) : (
          <img src={DarkLogo} alt="Logo" />
        )}
      </div>
      <div className="navbar-right">
        <div>
          <i
            className="fa-regular fa-moon"
            style={{
              color: "black",
              display: toggleLightMode ? "block" : "none",
              cursor: "pointer",
            }}
            onClick={() => setToggleLightMode(!toggleLightMode)}
          ></i>
          <i
            className="fa-regular fa-sun"
            style={{
              color: "white",
              display: toggleLightMode ? "none" : "block",
              cursor: "pointer",
            }}
            onClick={() => setToggleLightMode(!toggleLightMode)}
          ></i>
        </div>

        {localStorage.getItem("token") ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5rem",
            }}
          >
            <i className="fa-regular fa-bell"></i>
            <div
              className="button-container"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.7rem",
              }}
            >
              <i className="fa-solid fa-power-off"></i>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div
            className="button-container"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.7rem",
            }}
          >
            <i className="fa-solid fa-power-off"></i>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
