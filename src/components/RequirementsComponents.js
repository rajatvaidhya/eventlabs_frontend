import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./RequirementsComponents.css";
import RequirementsCard from "./RequirementsCard";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

let socket;
const RequirementsComponents = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const { eventId } = useParams();
  const [title, setTitle] = useState("");
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [radius, setRadius] = useState(0);
  const [eventName, setEventName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [availableInterests, setAvailableInterests] = useState([
    "Hiking",
    "Cooking",
    "Photography",
    "Yoga",
    "Reading",
    "Sports",
    "Art",
    "Music",
    "Social",
  ]);

  const getEventCoordinates = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/api/chat/room/${eventId}`);
      const data = await response.json();
      setEventName(data.chatRoom.name);
      setLocation({
        longitude: data.chatRoom.location.coordinates[0],
        latitude: data.chatRoom.location.coordinates[1],
      });
    } catch (error) {
      console.error("Error fetching chat room data:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInterestSelect = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);
  };

  const handleInterestRemove = (interest) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest));
  };

  const filteredInterests = availableInterests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePostsNumber = (event) => {
    setNumberOfPosts(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleClick = async () => {
    const response = await fetch(
      `${ENDPOINT}/api/requirements/createRequirement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          title,
          radius,
          selectedInterests,
          numberOfPosts,
          location,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      await socket.emit("notify", {
        location,
        title,
        eventName,
        radius,
        selectedInterests,
        eventId,
        reqId: data.reqId,
      });
      navigate(`/event/${eventId}`);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {});

    getEventCoordinates();
  }, []);

  return (
    <div className="requirements-container">
      {props.requirements.map((requirement) => (
        <RequirementsCard
          key={requirement._id}
          id={requirement._id}
          adminId={props.adminId}
          appliedBy={requirement.appliedBy}
          title={requirement.requirementTitle}
          numberOfPosts={requirement.requirementNumber}
        />
      ))}

      {localStorage.getItem("userId") === props.adminId ? (
        <div onClick={openModal} className="add-more-div">
          <i className="fa-solid fa-plus"></i>
          <h2>Add More</h2>
        </div>
      ) : (
        ""
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Details"
        className="modal require-modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="requirements-form">
          <input
            type="text"
            placeholder="Enter requirement"
            onChange={handleTitleChange}
          ></input>
          <input
            type="number"
            placeholder="Number of requirements"
            onChange={handlePostsNumber}
          ></input>

          <div>
            <div className="interest-tags-container">
              {filteredInterests.map((interest) => (
                <div
                  key={interest}
                  className="interest-tags"
                  style={{ color: "white" }}
                  onClick={() => handleInterestSelect(interest)}
                >
                  {interest}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ textAlign: "center" }}
              >
                Selected Interests
              </h3>
              <div
                className="flex flex-wrap"
                style={{ justifyContent: "center", gap: "0.5rem" }}
              >
                {selectedInterests.map((interest) => (
                  <div
                    key={interest}
                    className="interest-tags"
                    onClick={() => handleInterestRemove(interest)}
                    style={{ border: "1px solid rgb(11, 196, 67)" }}
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <input
            type="number"
            placeholder="Notify in radius"
            onChange={handleRadiusChange}
          ></input>
          <button onClick={handleClick}>Add requirement</button>
        </div>
      </Modal>
    </div>
  );
};

export default RequirementsComponents;
