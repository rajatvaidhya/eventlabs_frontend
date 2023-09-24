import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLightMode } from "../contexts/LightModeContext";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import "./Signup.css";

const Signup = () => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const navigate = useNavigate();
  const { toggleLightMode, setToggleLightMode } = useLightMode();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/mainpage");
    }
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    } else {
      console.log("Location sharing isn't possible due to network issue!");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(`${ENDPOINT}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        location,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userId", json.userId);
      localStorage.setItem("username", json.firstName);
      navigate("/interest-select");
      alert("Account Created Successfully");
    } else {
      alert("Invalid Details");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="signup-container"
        style={{
          backgroundColor: toggleLightMode ? "#BEFFF7" : "black",
          color: toggleLightMode ? "black" : "white",
          paddingTop: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <div
          className="main-signup-form"
          style={{
            backgroundColor: toggleLightMode ? "#9EDDFF" : "rgb(43, 43, 43)",
            color: toggleLightMode ? "black" : "white",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          }}
        >
          <h1>Create account to continue</h1>

          <div style={{ display: "flex", position: "relative" }}>
            <i
              className="fa-regular fa-envelope"
              style={{
                position: "absolute",
                top: "30%",
                marginLeft: ".5rem",
                color: toggleLightMode ? "#3085C3" : "rgb(11, 196, 67)",
                fontSize: "1.3rem",
              }}
            ></i>

            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              style={{
                paddingLeft: "2.5rem",
                backgroundColor: toggleLightMode
                  ? "rgb(136 215 212)"
                  : "rgb(56, 56, 56)",
                color: toggleLightMode ? "black" : "white",
              }}
            ></input>
          </div>

          <div className="names-container">
            <input
              type="text"
              placeholder="First name"
              style={{
                minWidth: "45%",
                backgroundColor: toggleLightMode
                  ? "rgb(136 215 212)"
                  : "rgb(56, 56, 56)",
                color: toggleLightMode ? "black" : "white",
              }}
              value={firstName}
              onChange={handleFirstNameChange}
            ></input>
            <input
              type="text"
              placeholder="Last name"
              style={{
                minWidth: "45%",
                backgroundColor: toggleLightMode
                  ? "rgb(136 215 212)"
                  : "rgb(56, 56, 56)",
                color: toggleLightMode ? "black" : "white",
              }}
              value={lastName}
              onChange={handleLastNameChange}
            ></input>
          </div>

          <div style={{ display: "flex", position: "relative" }}>
            <i
              className="fa-solid fa-phone"
              style={{
                position: "absolute",
                top: "30%",
                marginLeft: ".5rem",
                color: toggleLightMode ? "#3085C3" : "rgb(11, 196, 67)",
                fontSize: "1.3rem",
              }}
            ></i>

            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Phone number (along with country code ex : +917879278953)"
              style={{
                paddingLeft: "2.5rem",
                backgroundColor: toggleLightMode
                  ? "rgb(136 215 212)"
                  : "rgb(56, 56, 56)",
                color: toggleLightMode ? "black" : "white",
              }}
            ></input>
          </div>

          <div style={{ display: "flex", position: "relative" }}>
            <i
              className="fa-solid fa-lock"
              style={{
                position: "absolute",
                top: "30%",
                marginLeft: ".5rem",
                color: toggleLightMode ? "#3085C3" : "rgb(11, 196, 67)",
                fontSize: "1.3rem",
              }}
            ></i>

            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              style={{
                paddingLeft: "2.5rem",
                backgroundColor: toggleLightMode
                  ? "rgb(136 215 212)"
                  : "rgb(56, 56, 56)",
                color: toggleLightMode ? "black" : "white",
              }}
            ></input>
          </div>

          <div style={{ display: "flex", position: "relative" }}>
            <i
              className="fa-regular fa-eye"
              style={{
                position: "absolute",
                top: "30%",
                marginLeft: ".5rem",
                color: toggleLightMode ? "#3085C3" : "rgb(11, 196, 67)",
                fontSize: "1.3rem",
              }}
            ></i>

            <input
              type="password"
              placeholder="Confirm password"
              style={{
                paddingLeft: "2.5rem",
                backgroundColor: toggleLightMode
                  ? "rgb(136 215 212)"
                  : "rgb(56, 56, 56)",
                color: toggleLightMode ? "black" : "white",
              }}
            ></input>
          </div>

          {loading ? (
            <div style={{ marginBottom: "0.5rem" }}>
              <p style={{ color: "white", marginBottom: "0.4rem" }}>
                Creating your account ...
              </p>
              <Loader />
            </div>
          ) : (
            <div></div>
          )}

          <button
            className="signup-btn"
            onClick={handleSubmit}
            style={{
              backgroundColor: toggleLightMode ? "#ff444f" : "rgb(11, 196, 67)",
              color: "white",
            }}
          >
            Create Account
          </button>

          <p
            style={{
              marginTop: "0.7rem",
              marginBottom: "0.7rem",
              color: "white",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: toggleLightMode ? "#ff444f" : "rgb(11, 196, 67)",
              }}
            >
              Access account!
            </Link>
          </p>

          <div
            style={{ width: "100%", borderBottom: "0.2px solid white" }}
          ></div>

          <div className="additional-signups">
            <p>Or Signup with</p>
            <div className="add-logos">
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-discord"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
