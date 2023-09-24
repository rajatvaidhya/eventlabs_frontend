import React, { useEffect, useState } from "react";
import "./GroupInfo.css";
import Member from "./Member";
import { useLightMode } from "../contexts/LightModeContext";

const GroupInfo = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const [users, setUsers] = useState([]);
  const [length, setLength] = useState(0);
  const [admin, setAdmin] = useState([]);
  const [description, setDescription] = useState("");
  const roomId = props.roomId;
  const { toggleLightMode } = useLightMode();

  const fetchParticipants = async () => {
    const response = await fetch(`${ENDPOINT}/api/chat/getChatRoomData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId }),
    });

    if (response.ok) {
      const data = await response.json();

      setDescription(data.chatRoom.description);
      const uniqueUserIds = [];

      const uniqueUsers = data.users.filter((user) => {
        if (!uniqueUserIds.includes(user._id)) {
          uniqueUserIds.push(user._id);
          return true;
        }
        return false;
      });

      setUsers(uniqueUsers);
      setAdmin(data.admin);
      setLength(uniqueUsers.length);
    } else {
      console.error("Failed to add user to chat room");
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleCloseClick = () => {
    props.setToggleGroupInfo(!props.toggleGroupInfo);
    props.setToggleChatInfo(!props.toggleChatInfo);
  };

  return (
    <div
      className="group-info-container"
      style={{
        backgroundColor: toggleLightMode ? "#BEFFF7" : "rgb(26, 26, 26)",
        color: toggleLightMode ? "black" : "white",
      }}
    >
      <i className="fa-solid fa-xmark" onClick={handleCloseClick}></i>
      <h1>Event Details</h1>

      <div className="desc-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: ".5rem",
            color: "rgb(99, 99, 99)",
            fontWeight: "bold",
          }}
        >
          <i className="fa-solid fa-volume-high"></i>
          <h1>Description</h1>
        </div>
        <p>{description}</p>
      </div>

      <div className="admin-info">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "2rem",
            gap: ".5rem",
          }}
        >
          <i className="fa-solid fa-user-secret"></i>
          <h1>Admin</h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
            gap: ".6rem",
          }}
        >
          <img
            src={`${ENDPOINT}/api/auth/photo/${admin._id}`}
            style={{ borderRadius: "60px", height: "50px", width: "50px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <h1>{admin.firstName}</h1>
            <p
              style={{
                fontSize: "13px",
                color: "rgb(109, 109, 109)",
                fontStyle: "italic",
              }}
            >
              {admin.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="member-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "2rem",
            gap: ".5rem",
          }}
        >
          <i className="fa-solid fa-users"></i>
          <h1>Members ({length})</h1>
        </div>

        <div className="member-list">
          {users.map((member, index) => (
            <Member
              key={index}
              name={member.firstName}
              number={member.phoneNumber}
              image={member.image}
              id={member._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
