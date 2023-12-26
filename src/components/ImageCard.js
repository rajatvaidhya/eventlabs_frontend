import React, { useState } from "react";
import Modal from "react-modal";
import "./ImageCard.css";

const ImageCard = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const userId = localStorage.getItem("userId");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div
        style={{
          height: "16rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <div>
          <img
            className="main-image"
            src={`${ENDPOINT}/api/user/post/photo/${props.postId}`}
            alt="1"
            onClick={openModal}
          />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Details"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-content">
          <div className="modal-image">
            <img src={`${ENDPOINT}/api/user/post/photo/${props.postId}`}></img>
          </div>
          <div className="modal-info">
            <div className="profile-info">
              {props.imageOf === "user" ? (
                <div>
                  <img src={`${ENDPOINT}/api/auth/photo/${userId}`}></img>
                </div>
              ) : (
                <div>
                  <img
                    src={`${ENDPOINT}/api/chat/photo/${props.eventId}`}
                  ></img>
                </div>
              )}

              <p>
                {props.firstName} {props.lastName}
              </p>
              <p>·</p>
              <p>{props.phoneNumber}</p>
            </div>
            <p style={{ fontSize: "15px" }}>{props.caption}</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".6rem",
                marginTop: "2rem",
              }}
            >
              <i className="fa-regular fa-heart"></i>
              <p>1.3M Likes</p>
            </div>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "0.6rem",
                alignItems: "center",
              }}
            >
              <i className="fa-solid fa-comments"></i>
              <p>Comments</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageCard;
