import React, { useEffect, useState } from "react";
import "./Navbar.css";
import DarkLogo from "../images/Eventlabs__1_-removebg-preview.png";
import LightLogo from "../images/newlogo.png";
import NotifyPanel from "./NotifyPanel";
import { useNavigate } from "react-router-dom";
import { useLightMode } from "../contexts/LightModeContext";

const Navbar = () => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const navigate = useNavigate();

  const { toggleLightMode, setToggleLightMode } = useLightMode();
  const [notifications, setNotifications] = useState([]);
  const [notifyPanelToggle, setNotifyPanelToggle] = useState(false);

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

  const fetchNotifications = async () => {
    const response = await fetch(`${ENDPOINT}/api/user/fetchNotifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    });

    const json = await response.json();
    setNotifications(json.notifications);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotifications();
    }
  }, []);

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: toggleLightMode ? "white" : "black",
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
            className="fa-solid fa-sun"
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
          className="navbar-right-div"
          >
            <div onClick={() => setNotifyPanelToggle(!notifyPanelToggle)}>
              <div
                className="notification-count"
              >
                {" "}
                {notifications.length}
              </div>
              <i
                className="fa-regular fa-bell"
                style={{ cursor: "pointer" }}
              ></i>
              <NotifyPanel
                display={notifyPanelToggle}
                notifications={notifications}
              />
            </div>
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
