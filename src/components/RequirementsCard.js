import React, { useEffect, useState } from "react";
import "./RequirementsCard.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const RequirementsCard = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const handleDelete = async () =>{
    const response = await fetch(`${ENDPOINT}/api/requirements/deleteRequirement/${props.id}`,{
      method:'DELETE'
    })

    window.location.reload();
  }

  return (
    <>
      <div className="main-requirement-card">
        {localStorage.getItem("userId") === props.adminId ? (
          <i className="fa-solid fa-circle-minus" onClick={handleDelete}></i>
        ) : (
          ""
        )}
        <div className="requirement-card-left">
          <h2 className="requirement-heading">{props.title}</h2>
          <p className="cancellation-heading">
            {props.isFree === true
              ? "Free Cancellation"
              : "No Free Cancellation"}
          </p>
          <p className="valid-heading">
            Available on : {props.startDay} - {props.endDay} | Timings :{" "}
            {props.startTiming} - {props.endTiming}
          </p>
        </div>

        <div className="requirement-card-right">
          <div className="price-tag">
            <p className="price-heading">₹ {props.price}</p>
            <p className="tax-para">Inc. of all taxes</p>
          </div>
          <button className="create-button">Contact</button>
        </div>
      </div>
    </>
  );
};

export default RequirementsCard;
