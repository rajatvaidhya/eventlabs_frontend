import React, { useState } from "react";
import Modal from "react-modal";
import "./ImageCard.css";
import { useParams } from "react-router-dom";

const ImageCard = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const { userId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="main-imagecard-div">
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
        className="modal profile-work-images-main-modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-content profile-work-images-modal">
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
            <p>{props.caption}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageCard;
