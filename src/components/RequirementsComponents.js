import React, { useState } from "react";
import Modal from "react-modal";
import "./RequirementsComponents.css";
import RequirementsCard from "./RequirementsCard";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequirementsComponents = (props) => {
  const ENDPOINT = props.backendURL;

  const { eventId } = useParams();
  const [serviceName, setServiceName] = useState("");
  const [radioValue, setRadioValue] = useState(false);
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
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

    if(serviceName=="" || startDay=="" || endDay=="" || serviceDescription=="" || price==""){
      toast.error("Enter all details.", {
        position: "top-center",
        theme: "colored",
      });

      setLoading(false);
      return;
    }

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
          price,
          serviceDescription
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

    <>
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

      <div className="main-services-grid">
        {props.requirements.map((requirement) => (
          <RequirementsCard
            key={requirement._id}
            id={requirement._id}
            backendURL={ENDPOINT}
            title={requirement.requirementTitle}
            isFree={requirement.freeCancellation}
            startDay={requirement.startDay}
            endDay={requirement.endDay}
            price={requirement.price}
            description={requirement.requirementDescription}
            adminId={props.adminId}
            phoneNumber={props.phoneNumber}
          />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Details"
        className="modal require-modal add-service-modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="requirement-modal">
          <div className="modal-heading">{/* <h2>Add Service</h2> */}</div>

          <div className="service-form">
            <input
              type="text"
              placeholder="Service name"
              className="service-form-input"
              onChange={(e) => {
                setServiceName(e.target.value);
              }}
            ></input>

            <textarea
              type="text"
              placeholder="Service description"
              className="service-form-input"
              onChange={(e) => {
                setServiceDescription(e.target.value);
              }}
              rows={10}
            ></textarea>

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

    <ToastContainer/>
    </>
  );
};

export default RequirementsComponents;
