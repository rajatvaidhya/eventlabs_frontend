import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import SignupImage from "../images/4934424.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

const Signup = (props) => {
  const ENDPOINT = props.backendURL;

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [OTPScreen, setOTPScreen] = useState(false);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
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
    ReactGA.pageview(window.location.pathname);
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

  const handleOTPVerification = async(e) => {
    e.preventDefault();
    setLoading(true);

    if(firstName=="" || lastName==""){
      toast.error(`Enter all details`, {
        position: "top-center",
        theme: "colored",
      });
      return;
    }

    if(!email){
      toast.error(`Enter valid email`, {
        position: "top-center",
        theme: "colored",
      });
      return;
    }

    if(phoneNumber.length < 10){
      toast.error(`Enter valid phone number`, {
        position: "top-center",
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if(password.length < 8){
      toast.warn(`Password should be more than 8 characters`, {
        position: "top-center",
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    const response = await fetch(`${ENDPOINT}/api/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        phoneNumber,
      }),
    });

    const json = await response.json();

    if (json.success === true) {
      setOTPScreen(true);
      setLoading(false);
    } else {
      toast.error(`${json.message}`, {
        position: "top-center",
        theme: "colored",
      });
      setLoading(false);
    }
  };

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
        FrontendOTP:otp
      }),
    });

    const json = await response.json();

    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userId", json.userId);
      localStorage.setItem("username", json.firstName);
      navigate("/mainpage");
      toast.success(`Account created successfully`, {
        position: "top-center",
        theme: "colored",
      });
    } else {
      toast.error(`${json.message}`, {
        position: "top-center",
        theme: "colored",
      });
      setLoading(false);
    }
  };

  const handleOtpChange = (event, index) => {
    const { value } = event.target;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, key) => {
    if (key === "Backspace" && index > 0) {
      inputRefs.current[index-1].focus();
    }
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Create your account - Eventlabs</title>
        <link rel="canonical" href="https://eventlabs-frontend.vercel.app/signup" />
        <meta
          name="description"
          content={`Explore the best services in your city. Find top-rated electricians, plumbers, florists, decorators, and more. All services at your fingertips on Eventlabs.`}
        />
      </Helmet>

      <Navbar />

      <div className="main-signup-div">
        <div className="signup-img-div">
          <img src={SignupImage}></img>
        </div>

        {OTPScreen ? (
          <div className="login-form-div signup-form-div">
            <h1>Enter OTP</h1>
            <p>To verify your account, enter OTP sent to {email}.</p>

            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleOtpChange(event, index)}
                  onKeyDown={({ nativeEvent: { key } }) =>
                    handleKeyDown(index, key)
                  }
                  className="otp-digit-input"
                />
              ))}
            </div>

            <button
              className="submit-btn"
              style={{ marginTop: "2rem" }}
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="btn-loader">
                  <Loader color="white" />
                  <p>Verifying OTP ...</p>
                </div>
              ) : (
                <div>Verify OTP</div>
              )}
            </button>
          </div>
        ) : (
          <div className="login-form-div signup-form-div">
            <h1>Create an account</h1>
            <p>
              Join eventlabs community and enjoy resources by creating your
              account for free!
            </p>

            <div className="login-inputs signup-inputs">
              <input
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
              ></input>

              <div className="names-input">
                <input
                  type="text"
                  placeholder="First name"
                  onChange={handleFirstNameChange}
                ></input>
                <input
                  type="text"
                  placeholder="Last name"
                  onChange={handleLastNameChange}
                ></input>
              </div>
              <input
                type="number"
                placeholder="Phone number"
                onChange={handlePhoneChange}
              ></input>
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              ></input>
            </div>

            <div className="signup-option login-option">
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <span>Login.</span>
                </Link>
              </p>
            </div>

            <button
              className="submit-btn signup-btn"
              onClick={handleOTPVerification}
            >
              {loading ? (
                <div className="btn-loader">
                  <Loader color="white" />
                  <p>Creating an account ...</p>
                </div>
              ) : (
                <div>Sign up</div>
              )}
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
