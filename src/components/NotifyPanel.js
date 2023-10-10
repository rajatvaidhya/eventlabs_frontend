import React from "react";
import "./NotifyPanel.css";
import { Link } from "react-router-dom";
import { useLightMode } from "../contexts/LightModeContext";

const NotifyPanel = (props) => {

  const {toggleLightMode} = useLightMode();

  return (
    <div
      className="notification-panel"
      style={{ display: props.display ? "block" : "none", backgroundColor:toggleLightMode?'rgb(255, 255, 255, 0.9)':'rgb(24, 24, 24, 0.9)'}}
    >
      <ul>
        {props.notifications.map((notification, index) => (
            <Link to={`/chat/${notification.id}`}>
                <li style={{borderBottom:toggleLightMode?'1px solid #d5d5d5':'1px solid #2b2b2b'}} key={index}><span style={{color:toggleLightMode?'rgb(255, 68, 79)':'rgb(11, 196, 67)'}}>{notification.eventName}</span> event has been created at <span style={{color:toggleLightMode?'rgb(255, 68, 79)':'rgb(11, 196, 67)'}}>{notification.eventAddress}</span></li>
            </Link>
        ))}
      </ul>
    </div>
  );
};

export default NotifyPanel;
