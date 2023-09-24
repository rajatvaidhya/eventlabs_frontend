import React, { useEffect, useState } from "react";
import "./SideMessage.css";
import MessageBox from "./MessageBox";
import { useLightMode } from "../contexts/LightModeContext";

const SideMessage = () => {
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
    <div
      className="main-side-container"
      style={{
        backgroundColor: toggleLightMode ? "#BEFFF7" : "rgb(26, 26, 26)",
        color: toggleLightMode ? "black" : "white",
      }}
    >
      <div className="heading">
        <h2>Your Groups</h2>
        <h1>
          <i className="fa-solid fa-user-group"></i>
        </h1>
      </div>
      <div className="search-container">
        <i
          className="fa-solid fa-magnifying-glass"
          style={{ position: "absolute", paddingLeft: "10px" }}
        ></i>
        <input
          style={{
            backgroundColor: toggleLightMode ? "#9EDDFF" : "rgb(51, 51, 51)",
          }}
          className="search-bar"
          type="text"
          placeholder="Search"
        ></input>
      </div>
      <div className="side-rooms-panel">
        {rooms.map((room, index) => (
          <MessageBox
            key={index}
            name={room.name}
            id={room._id}
            time={
              room.messages.length > 0
                ? room.messages[room.messages.length - 1].createdAt
                : ""
            }
            lastmsg={
              room.messages.length > 0
                ? room.messages[room.messages.length - 1].content
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SideMessage;
