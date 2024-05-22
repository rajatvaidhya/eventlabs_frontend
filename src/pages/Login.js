import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import LoginImage from "../images/5101873.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from 'react-ga';
import { Helmet } from "react-helmet";

const Login = (props) => {
  const ENDPOINT = props.backendURL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
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

    const json = await response.json();

    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userId", json.userId);
      localStorage.setItem("username", json.firstName);
      navigate("/mainpage");
    } else {
      toast.error("Invalid details", {
        position: "top-center",
        theme: "colored",
      });
      setLoading(false);
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login to Eventlabs</title>
        <link
          rel="canonical"
          href="https://eventlabs-frontend.vercel.app/login"
        />
        <meta
          name="description"
          content={`Explore the best services in your city. Find top-rated electricians, plumbers, florists, decorators, and more. All services at your fingertips on Eventlabs.`}
        />
      </Helmet>

      <Navbar />
      <ToastContainer />
      <div className="main-login-div">
        <div className="login-img-div">
          <img src={LoginImage}></img>
        </div>

        <div className="login-form-div">
          <h1>Account Login</h1>
          <p>
            If you are already a member you can login with email address and
            password.
          </p>

          <div className="login-inputs">
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
            ></input>
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            ></input>
          </div>

          <div className="signup-option">
            <p>
              Don't have an account?{" "}
              <Link to="/signup">
                <span>Create one.</span>
              </Link>
            </p>
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="btn-loader">
                <Loader color="white" />
                <p>Accessing account ...</p>
              </div>
            ) : (
              <div>Login</div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
