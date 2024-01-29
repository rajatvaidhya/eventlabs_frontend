import React, { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import DarkModeImage from "../images/8217095.jpg";
import LightModeImage from "../images/imgonline-com-ua-Rotate360-osbMT9fa3KSXqU.jpg";
import HomeImage2 from "../images/homeimage2.jpg";
import HomeImage3 from "../images/homeimage3.jpg";
import { useNavigate } from "react-router-dom";
import FelxiFooter from "../components/FelxiFooter";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  const CommentCard = () => {
    return (
      <div className="second-card">
        <div className="second-card-comment">
          <p>
            Love the integrations with Calendar, Zoom and WhatsApp. Makes my
            life easier!
          </p>
        </div>
        <div className="second-card-bottom">
          <img src="https://picsum.photos/50/50" />
          <div>
            <h3>Aishwarya Rai</h3>
            <p>Malad, Mumbai</p>
          </div>
        </div>
      </div>
    );
  };

  const Third = () => {
    return (
      <div>
        <h1>
          Find the <span>right experts</span>
        </h1>
        <p className="third-text">Get help from top personalized experts near you!</p>

        <div className="third-input-container">
          <input type="text" placeholder="Search here to get nearby results"></input>
            <h2>Search</h2>
        </div>

        <div className="third-grid">
          <div className="third-card">
            <p className="third-card-head">Find nearby parties and events</p>
            <p className="third-card-bottom">I am looking for nearby parties in London</p>
          </div>

          <div className="third-card">
            <p className="third-card-head">Find nearby salons & spas</p>
            <p className="third-card-bottom">I am looking for nearby salons in London</p>
          </div>
        </div>

        <div className="third-grid" style={{marginBottom:'5rem'}}>
          <div className="third-card">
            <p className="third-card-head">Find nearby electricians</p>
            <p className="third-card-bottom">I am looking for nearby electricians in London</p>
          </div>

          <div className="third-card">
            <p className="third-card-head">Find nearby decoration service</p>
            <p className="third-card-bottom">I am looking for nearby decorators in London</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div
        className="main-home-container"
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <div className="first" style={{ position: "relative" }}>
          <img src={DarkModeImage} alt="Background" />

          <div className="first-div" style={{ color: "white" }}>
            <h1>Discover Nearby Services and Participate in Local Events</h1>
            <p style={{ marginTop: "2rem" }}>
              
Looking for reliable service professionals in your area? Look no further than Eventlabs. We're your go-to destination for finding top-notch service businesses nearby, whether you need an electrician, plumber, salon, spa, and much more. With our user-friendly platform and verified listings, finding the perfect service provider has never been easier.
            </p>
            <button
              onClick={handleClick}
              style={{
                backgroundColor: "rgb(11, 196, 67)",
                color: "white",
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="third">
          <Third />
        </div>

        <div className="second">
          <h1>Peoples love using eventlabs</h1>

          <div className="second-grid">
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </div>
        </div>
      </div>

      <FelxiFooter />
    </>
  );
};

export default Home;
