import React, { useEffect, useState } from "react";
import "./RequirementsCard.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const RequirementsCard = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const MAX_LETTERS = 14;

  const truncateText = (text) => {
    if (text.length > MAX_LETTERS) {
      return text.slice(0, MAX_LETTERS) + "...";
    }
    return text;
  };

  const handleDelete = async () => {
    const response = await fetch(
      `${ENDPOINT}/api/requirements/deleteRequirement/${props.id}`,
      {
        method: "DELETE",
      }
    );

    window.location.reload();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="main-requirement-card">
        {localStorage.getItem("userId") === props.adminId ? (
          <i className="fa-solid fa-circle-minus" onClick={handleDelete}></i>
        ) : (
          ""
        )}
        <div className="requirement-card-left">
          <h2 className="requirement-heading">{truncateText(props.title)}</h2>
          <p className="cancellation-heading">
            {props.isFree === true
              ? "Free Cancellation"
              : "No Free Cancellation"}
          </p>
          <p className="valid-heading">
            Available on : {props.startDay} - {props.endDay}
          </p>
        </div>

        <div className="requirement-card-right">
          <div className="price-tag">
            <p className="price-heading">₹ {props.price}</p>
            <p className="tax-para">Inc. of all taxes</p>
          </div>
          <button className="create-button" onClick={openModal}>
            Info
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Details"
        className="modal require-modal service-modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="service-info-modal">
          <h3>{props.title}</h3>
          <p className="service-desc">
            {props.description}
          </p>
          <p className="cancellation-heading">
            {props.isFree === true
              ? "Free Cancellation"
              : "No Free Cancellation"}
          </p>

          <p className="valid-heading">
            Available on : {props.startDay} - {props.endDay}
          </p>

          <div className="price-tag">
            <div>
              <p className="price-heading">₹ {props.price}</p>
              <p className="tax-para">Inc. of all taxes</p>
            </div>

            <div style={{display:'flex', gap:'1rem'}}>

            <a href={`tel:${props.phoneNumber}`}>
              <button className="create-button">Call</button>
            </a>
            <a href={`tel:${props.phoneNumber}`}>
              <button className="create-button">Chat</button>
            </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RequirementsCard;
