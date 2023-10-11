import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLightMode } from "../contexts/LightModeContext";
import "./MainPage.css";
import SecondSection from "../components/SecondSection";
import ThirdContainer from "../components/ThirdContainer";
import FourthSection from "../components/FourthSection";
import Navbar from "../components/Navbar";

const MainPage = () => {
    const ENDPOINT = "https://eventlabs-backend.onrender.com";
    // const ENDPOINT = "http://localhost:5000";

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const { toggleLightMode } = useLightMode();

  const openModal = () => {
    navigate('/create-event');
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const setLiveLocation = async (longitude, latitude) => {
    console.log(longitude, latitude);

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
    } else {
      console.log("Error updating locationeee");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        setLiveLocation(longitude, latitude);
      });
    } else {
      console.log("Location sharing isn't possible due to network issue!");
    }
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="main-container"
        style={{ backgroundColor: toggleLightMode ? "white" : "black" }}
      >
        <div
          className="welcome-container"
          style={{
            color: toggleLightMode ? "black" : "white",
            padding: "2rem",
            borderBottom:toggleLightMode?'0.3px dashed rgb(196, 196, 196)':'0.3px dashed rgb(26,26,26)'
          }}
        >
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <h1 className="welcome-heading">
              <span
                className="user-welcome"
                style={{
                  backgroundImage: toggleLightMode
                    ? "linear-gradient(45deg, #6499E9, rgb(247 2 81))"
                    : "linear-gradient(45deg, #47ffd1, #128a02)",
                }}
              >
                Hello, {username}!
              </span>
              <span className="wavy-emoji" role="img" aria-label="Wave">
                👋
              </span>
            </h1>
            <p style={{ marginTop: "1rem" }} className="heading-para">
              Create events and join with the nearby people who fits best on
              your interest.
            </p>

            <button
              onClick={openModal}
              className="create-event-button"
              style={{
                backgroundColor: toggleLightMode
                  ? "#ff444f"
                  : "rgb(11, 196, 67)",
                color: "white",
              }}
            >
              <div>
                <h1>Create Event</h1>
                <i className="fa-solid fa-plus"></i>
              </div>
            </button>
          </div>
        </div>

        <SecondSection />
        <ThirdContainer />
        <FourthSection />
      </div>
    </>
  );
};

export default MainPage;
