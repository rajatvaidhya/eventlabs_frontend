import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import SignupImage from '../images/4934424.png'
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
      navigate("/mainpage");
      alert("Account Created Successfully");
    } else {
      alert("Invalid Details");
    }
  };

  return (
    <>
      <Navbar />

      <div className="main-signup-div">
        <div className="signup-img-div">
          <img src={SignupImage}></img>
        </div>

        <div className="login-form-div signup-form-div">
          <h1>Create an account</h1>
          <p>
            Join eventlabs community and enjoy resources by creating your account for free! 
          </p>

          <div className="login-inputs signup-inputs">
            <input type="email" placeholder="Email" onChange={handleEmailChange}></input>

            <div className="names-input">
            <input type="text" placeholder="First name" onChange={handleFirstNameChange}></input>
            <input type="text" placeholder="Last name" onChange={handleLastNameChange}></input>
            </div>
            <input type="number" placeholder="Phone number (India only, don't include +91)" onChange={handlePhoneChange}></input>
            <input type="password" placeholder="Password" onChange={handlePasswordChange}></input>
          </div>

          <div className="signup-option login-option">
          <p>Already have an account? <Link to="/login"><span>Login.</span></Link></p>
          </div>

          <button className="submit-btn signup-btn" onClick={handleSubmit}>{loading ? (
                <div className="btn-loader">
                  <Loader color="white"/>
                  <p>Creating an account ...</p>
              </div>
            ) : (
              <div>Sign up</div>
            )}</button>
        </div>
      </div>
    </>
  );
};

export default Signup;
