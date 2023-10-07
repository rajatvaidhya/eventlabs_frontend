import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLightMode } from "../contexts/LightModeContext";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import LoginImage from "../images/110-removebg-preview.png";

const Login = () => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toggleLightMode, setToggleLightMode } = useLightMode();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/mainpage");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(`${ENDPOINT}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log(response);

    const json = await response.json();
    console.log(json);

    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userId", json.userId);
      localStorage.setItem("username", json.firstName);
      navigate("/mainpage");
      alert("Logged in successfully");
    } else {
      alert("Invalid details");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Navbar />

      <div
        className="signup-container"
        style={{
          color: toggleLightMode ? "black" : "white",
          backgroundColor: toggleLightMode ? "white" : "black",
          paddingTop: "1rem",
        }}
      >
        <div
          className="main-signup-form"
          style={{
            backgroundColor: toggleLightMode ? "white" : "rgb(43, 43, 43)",
            color: toggleLightMode ? "black" : "white",
            border:'1px solid #b3b3b3',
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          }}
        >
          <h1>Login</h1>

          <div style={{ display: "flex", position: "relative" }}>
            <i
              className="fa-regular fa-envelope"
              style={{
                position: "absolute",
                top: "30%",
                marginLeft: ".5rem",
                color: toggleLightMode ? "#ff444f" : "rgb(11, 196, 67)",
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
                  ? "white"
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
                color: toggleLightMode ? "#ff444f" : "rgb(11, 196, 67)",
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
                  ? "white"
                  : "rgb(56, 56, 56)",
                color: toggleLightMode ? "black" : "white",
              }}
            ></input>
          </div>

          <button
            className="signup-btn"
            onClick={handleSubmit}
            style={{
              backgroundColor: toggleLightMode ? "#ff444f" : "rgb(11, 196, 67)",
              color: "white",
            }}
          >
            {loading ? (
              <div>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'1rem', justifyContent:'center'}}>
                  <Loader color="white"/>
                  <p>Accessing account ...</p>
                </div>
              </div>
            ) : (
              <div>Login</div>
            )}
          </button>

          <p
            style={{
              marginTop: "0.7rem",
              marginBottom: "0.7rem",
              color: toggleLightMode ? "black" : "white",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: toggleLightMode ? "#ff444f" : "rgb(11, 196, 67)",
              }}
            >
              Create one!
            </Link>
          </p>

          <div
            style={{ width: "100%", borderBottom: "0.2px solid white" }}
          ></div>

          <div className="additional-signups">
            <p>Or Login with</p>
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

export default Login;
