import React from "react";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";
import { useLightMode } from "../contexts/LightModeContext";

const EventCard = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
// const ENDPOINT = "http://localhost:5000";

  const { toggleLightMode } = useLightMode();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${props.id}`);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{
        backgroundColor: toggleLightMode ? "white" : "black",
        color: toggleLightMode ? "black" : "white",
        border:toggleLightMode?'1px solid #acacac':'1px solid #292929'
      }}
    >
      <div className="card-image-container">
        <img
          src={`${ENDPOINT}/api/chat/photo/${props.id}`}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h2 className="card-name">{props.name}</h2>
        <p className="card-description">{props.location}</p>
      </div>
    </div>
  );
};

export default EventCard;
