import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import LoginImage from "../images/5101873.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    } else {
      toast.error("Invalid details", {
        position: "top-center",
        theme: "colored",
      });
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

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
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
