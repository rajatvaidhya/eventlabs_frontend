import React from "react";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";

const EventCard = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const navigate = useNavigate();

  const handleClick = () => {
    window.open(`/event/${props.id}`, "_blank");
  };

  return (
    <div
      className="card"
      onClick={handleClick}
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
