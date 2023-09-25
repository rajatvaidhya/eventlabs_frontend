import React from "react";
import "./MessageBox.css";
import { Link } from "react-router-dom";

const MessageBox = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const timestamp = props.time;
  const date = new Date(timestamp);
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Link to={`/chat/${props.id}`} target="_blank">
      <div className="message-box-container">
        <div style={{ display: "flex" }}>
          <img src={`${ENDPOINT}/api/chat/photo/${props.id}`} alt="" />

          <div className="content">
            <h1>{props.name}</h1>

            <p className="lastmsg">{props.lastmsg}</p>
          </div>
        </div>

        <div className="timing">
          <h1>{formattedTime}</h1>
          <i
            className="fa-solid fa-check-double"
            style={{ color: "lightgreen" }}
          ></i>
        </div>
      </div>
    </Link>
  );
};

export default MessageBox;
