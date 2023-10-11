import React, { useEffect, useState } from "react";
import "./ThirdContainer.css";
import EventCard from "./EventCard";
import { useLightMode } from "../contexts/LightModeContext";

const ThirdContainer = () => {
    const ENDPOINT = "https://eventlabs-backend.onrender.com";
    // const ENDPOINT = "http://localhost:5000";

  const userId = localStorage.getItem("userId");
  const { toggleLightMode } = useLightMode();

  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const response = await fetch(`${ENDPOINT}/api/chat/fetchAllRooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const data = await response.json();

      const uniqueRoomNames = [];

      const uniqueRooms = data.filter((room) => {
        if (!uniqueRoomNames.includes(room._id)) {
          uniqueRoomNames.push(room._id);
          return true;
        }
        return false;
      });

      setRooms(uniqueRooms);
    } else {
      console.error("Failed to get chat room");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="third-container" style={{ color: "white", borderBottom:toggleLightMode?'0.3px dashed rgb(196, 196, 196)':'0.3px dashed rgb(26,26,26)' }}>
      <h1 style={{ color: toggleLightMode ? "black" : "white" }}>
        <span className="your-events-title" style={{letterSpacing:'-0.4px', borderBottomLeftRadius:'4px', borderBottomRightRadius:'4px', borderBottom:toggleLightMode?'2px solid rgb(255, 68, 79)':'2px solid rgb(11, 196, 67)'}}>Events You're In</span>
      </h1>

      <div className="event-cards">
        {rooms.map((room, index) => (
          <EventCard
            key={index}
            name={room.name}
            image={room.image}
            location={room.address}
            id={room._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ThirdContainer;
