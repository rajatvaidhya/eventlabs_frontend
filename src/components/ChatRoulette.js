import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Message from "./Message";
import "./ChatRoulette.css";
import SideMessage from "./SideMessage";
import GroupInfo from "./GroupInfo";
import { useLightMode } from "../contexts/LightModeContext";
import ChatRouletteImage from "../images/Untitled design.png";

let socket;
const ENDPOINT = "https://eventlabs-backend.onrender.com";
// const ENDPOINT = "http://localhost:5000";

function ChatRoulette() {
  const { roomId } = useParams();
  const { toggleLightMode } = useLightMode();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomAddress, setRoomAddress] = useState("");
  const [roomImage, setRoomImage] = useState("");
  const [toggleGroupInfo, setToggleGroupInfo] = useState(true);
  const [toggleChatInfo, setToggleChatInfo] = useState(true);
  const scrollerRef = useRef();

  const fetchChatRoomData = async () => {
    const response = await fetch(`${ENDPOINT}/api/chat/getChatRoomData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId }),
    });

    if (response.ok) {
      const data = await response.json();
      setRoomName(data.chatRoom.name);
      setRoomImage(data.chatRoom.image);
      setRoomAddress(data.chatRoom.address);
    } else {
      console.error("Failed to add user to chat room");
    }
  };

  useEffect(() => {
    fetchChatRoomData();
  }, []);

  useEffect(() => {
    fetch(`${ENDPOINT}/api/messages/room/${roomId}/messages`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching chat room messages:", error);
      });
  }, []);

  const handleSend = async () => {
    let token = localStorage.getItem("token");
    await socket.emit("message", { roomId, newMessage, token });
    setNewMessage("");
  };

  const addUserToChatRoom = async () => {
    try {
      const userId = await localStorage.getItem("userId");

      if (!userId) {
        return;
      }

      const requestBody = {
        roomId: roomId,
        userId: userId,
      };

      socket.emit("join-room", roomId);

      const response = await fetch(`${ENDPOINT}/api/chat/addParticipant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Failed to add user to chat room");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("Socket Connected!");
    });

    addUserToChatRoom();
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleGroupInfoToggle = () => {
    setToggleGroupInfo(!toggleGroupInfo);
    setToggleChatInfo(!toggleChatInfo);
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      setToggleChatInfo(true);
      setToggleGroupInfo(true);
    } else {
      setToggleChatInfo(true);
      setToggleGroupInfo(false);
    }
  }, []);

  return (
    <div
      className="main-chat-page"
      style={{
        backgroundColor: toggleLightMode ? "#6499E9" : "rgb(15, 15, 15)",
        color: toggleLightMode ? "black" : "white",
      }}
    >
      <div className="your-groups-container">
        <SideMessage roomId={roomId} />
      </div>

      {toggleChatInfo ? (
        <div className="roulette" style={{ height: "100vh" }}>
          <div
            className="roulette-header"
            style={{
              backgroundColor: toggleLightMode ? "#BEFFF7" : "rgb(26, 26, 26)",
              color: toggleLightMode ? "black" : "white",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <div className="roulette-header-img">
                <img src={`${ENDPOINT}/api/chat/photo/${roomId}`} />
              </div>

              <div>
                <h1 style={{ color: toggleLightMode ? "black" : "white" }}>
                  {roomName}
                </h1>
                <p>{roomAddress}</p>
              </div>
            </div>

            <div className="dots" onClick={handleGroupInfoToggle}>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>

          <div className="chat-container scroller" ref={scrollerRef}>
            {messages.map((message, index) => (
              <Message
                id={message}
                key={index}
                index={index}
                sender={message.sender}
                sendername={message.senderName}
                content={message.content}
                phonenumber={message.senderNumber}
                image={message.image}
                time={message.createdAt}
                messages={messages}
              />
            ))}
          </div>

          <div className="input-bar">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              style={{
                color: toggleLightMode ? "black" : "white",
                backgroundColor: toggleLightMode
                  ? "#9EDDFF"
                  : "rgb(51, 51, 51)",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>
              <i
                className="fa-solid fa-paper-plane"
                style={{
                  color: toggleLightMode ? "rgb(255, 68, 79)" : "lightgreen",
                }}
              ></i>
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {toggleGroupInfo ? (
        <div className="right-most-container">
          <GroupInfo
            roomId={roomId}
            setToggleGroupInfo={setToggleGroupInfo}
            setToggleChatInfo={setToggleChatInfo}
            toggleGroupInfo={toggleGroupInfo}
            toggleChatInfo={toggleChatInfo}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ChatRoulette;
