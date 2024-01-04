import React, { useState } from "react";
import Modal from "react-modal";
import "./RequirementsComponents.css";
import RequirementsCard from "./RequirementsCard";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

const RequirementsComponents = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const { eventId } = useParams();
  const [serviceName, setServiceName] = useState("");
  const [radioValue, setRadioValue] = useState(false);
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [startTiming, setStartTiming] = useState("");
  const [endTiming, setEndTiming] = useState("");
  const [price, setPrice] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setRadioValue(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = async () => {
    setLoading(true);

    const response = await fetch(
      `${ENDPOINT}/api/requirements/createRequirement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          serviceName,
          radioValue,
          startDay,
          endDay,
          startTiming,
          endTiming,
          price,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Error in adding.");
    }
  };

  return (
    <div className="requirements-container">
      {localStorage.getItem("userId") === props.adminId ? (
        <button
          className="create-button add-services-button"
          onClick={openModal}
        >
          Add services
        </button>
      ) : (
        ""
      )}

      {props.requirements.map((requirement) => (
        <RequirementsCard
          key={requirement._id}
          id={requirement._id}
          title={requirement.requirementTitle}
          isFree={requirement.freeCancellation}
          startDay={requirement.startDay}
          endDay={requirement.endDay}
          startTiming={requirement.startTiming}
          endTiming={requirement.endTiming}
          price={requirement.price}
          adminId={props.adminId}
        />
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Details"
        className="modal require-modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="requirement-modal">
          <div className="modal-heading">
            <h2>Add Service</h2>
          </div>

          <div className="service-form">
            <input
              type="text"
              placeholder="Service name"
              className="service-form-input"
              onChange={(e) => {
                setServiceName(e.target.value);
              }}
            ></input>
            <div className="cancellation-div">
              <input
                type="radio"
                value="cancellation"
                name="cancellation"
                onChange={() => {
                  setRadioValue((prevValue) => !prevValue);
                }}
              ></input>
              <label htmlFor="cancellation">Free cancellation?</label>
            </div>

            <div className="available-div">
              <div className="available-inside">
                <p>From : </p>
                <select
                  value={startDay}
                  onChange={(e) => {
                    setStartDay(e.target.value);
                  }}
                >
                  <option>Start Day</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thrusday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>

                <p>To : </p>
                <select
                  value={endDay}
                  onChange={(e) => {
                    setEndDay(e.target.value);
                  }}
                >
                  <option>End Day</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thrusday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>
            </div>

            <div className="timings">
              <div className="available-inside">
                <p>From : </p>
                <select
                  value={startTiming}
                  onChange={(e) => {
                    setStartTiming(e.target.value);
                  }}
                >
                  <option>Start Time</option>
                  <option>1:00</option>
                  <option>2:00</option>
                  <option>3:00</option>
                  <option>5:00</option>
                  <option>6:00</option>
                  <option>7:00</option>
                  <option>8:00</option>
                  <option>9:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>12:00</option>
                </select>

                <p>To : </p>
                <select
                  value={endTiming}
                  onChange={(e) => {
                    setEndTiming(e.target.value);
                  }}
                >
                  <option>End Time</option>
                  <option>1:00</option>
                  <option>2:00</option>
                  <option>3:00</option>
                  <option>5:00</option>
                  <option>6:00</option>
                  <option>7:00</option>
                  <option>8:00</option>
                  <option>9:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>12:00</option>
                </select>
              </div>
            </div>

            <div className="price-input">
              <input
                type="number"
                placeholder="Set price in rupees"
                className="service-form-input"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></input>
            </div>

            <button
              className="create-button service-button-modal"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? (
                <div className="upload-post-button-loader">
                  <Loader />
                </div>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RequirementsComponents;
