import React, { useEffect, useRef, useState } from "react";
import Sound from "../sounds/message_sent.mp3";
import { useLightMode } from "../contexts/LightModeContext";
import "./Message.css";

const Message = (props) => {
    const ENDPOINT = "https://eventlabs-backend.onrender.com";
    // const ENDPOINT = "http://localhost:5000";
  const audioRef = useRef(null);
  const id = localStorage.getItem("userId");
  const [msgtime, setMsgTime] = useState("");
  const { toggleLightMode } = useLightMode();

  useEffect(() => {
    const timestamp = props.time;
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setMsgTime(formattedTime);

    const audioElement = new Audio(Sound);
    audioRef.current = audioElement;

    audioElement.addEventListener("canplaythrough", () => {
      audioElement.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    });
  }, []);

  return (
    <>
      {props.sender === id ? (
        <div
          className={`${
            props.messages?.[props.index - 1]?.senderNumber ===
            props.phonenumber
              ? "mt-[1px]"
              : "mt-[16px]"
          } mb-[16px] max-w-fit message-box`}
        >
          <div
            className={`${
              props.messages?.[props.index - 1]?.senderNumber ===
              props.phonenumber
                ? "mr-[42px]"
                : ""
            } texts`}
          >
            <div
              className="msg"
              style={{
                backgroundColor: toggleLightMode
                  ? "rgb(255, 68, 79)"
                  : "rgb(23, 153, 66)",
              }}
            >
              {props.messages?.[props.index - 1]?.senderNumber !==
                props.phonenumber && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "3rem",
                  }}
                >
                  <p className="you-label">You</p>
                  <p className="phone-label"> ~ {props.phonenumber}</p>
                </div>
              )}
              <p
                className="mr-[50px]"
                style={{
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                {props.content}
              </p>
              <p className="msg-time mt-[-10px] text-right">{msgtime}</p>
            </div>
          </div>
          {props.messages?.[props.index - 1]?.senderNumber !==
            props.phonenumber && (
            <img src={`${ENDPOINT}/api/auth/photo/${props.sender}`} />
          )}
        </div>
      ) : (
        <div>
          <div
            className={`${
              props.messages?.[props.index - 1]?.senderNumber ===
              props.phonenumber
                ? "mt-[1px]"
                : "mt-[16px]"
            } mr-[16px] mb-[16px] max-w-fit receive-box`}
          >
            {props.messages?.[props.index - 1]?.senderNumber !==
              props.phonenumber && (
              <img
                src={`${ENDPOINT}/api/auth/photo/${props.sender}`}
                alt="im"
              />
            )}

            <div
              className={`${
                props.messages?.[props.index - 1]?.senderNumber ===
                props.phonenumber
                  ? "ml-[42px]"
                  : ""
              } texts`}
            >
              <div
                className="msg"
                style={{
                  backgroundColor: toggleLightMode ? "#fff" : "rgb(3 59 52)",
                  color: toggleLightMode ? "black" : "white",
                }}
              >
                {props.messages?.[props.index - 1]?.senderNumber !==
                  props.phonenumber && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: "3rem",
                    }}
                  >
                    <p className="user-label">{props.sendername}</p>
                    <p className="phone-label"> ~ {props.phonenumber}</p>
                  </div>
                )}

                <p
                  style={{
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {props.content}
                </p>
                <p className="msg-time">{msgtime}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
