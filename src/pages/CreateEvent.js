import React, { useEffect, useState } from "react";
import "./CreateEvent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import CreateEventImage from "../images/8614927.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEvent = ({ isOpen, onClose, backendURL }) => {
  const navigate = useNavigate();
  const ENDPOINT = backendURL;

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();
  const [addressList, setAddressList] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [imageSelectToggle, setImageSelectToggle] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [date, setDate] = useState("");
  // const [createEventLoading, setCreateEventLoading] = useState(true);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const [suggestions, setSuggestions] = useState([]);

  const data = [
    "Events and Parties",
    "Electricians",
    "Spa and Salons",
    "Cleaning Services",
    "Flower and Decorations",
    "Marriage and Catering",
    "Plumbers",
    "Photographers",
    "Textile Services",
    "Pet Care Service",
    "Fitness Services",
    "Legal and Consultancy Services",
    "Medical Services",
    "Hostels and PGs"
  ];

  const handleCategoryChange = (e) => {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    const newSuggestions = data.filter((item) =>
      item.toLowerCase().includes(newSearchTerm)
    );
    setSuggestions(newSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageSelectToggle(true);
    setImage(e.target.files[0]);
  };

  const handleCreateEvent = async () => {
    setButtonDisable(true);
    const formData = new FormData();

    if (
      eventName == "" ||
      description == "" ||
      address == "" ||
      searchTerm == ""
    ) {
      toast.error("Enter all details", {
        position: "top-center",
        theme: "colored",
      });
      setButtonDisable(false);
      return;
    }

    if (!image) {
      toast.error("Select an image to continue", {
        position: "top-center",
        theme: "colored",
      });
      setButtonDisable(false);
      return;
    }

    if (location.latitude == 0 || location.longitude == 0) {
      toast.error("Set the business location", {
        position: "top-center",
        theme: "colored",
      });
      setButtonDisable(false);
      return;
    }

    if (!data.includes(searchTerm)) {
      toast.error("Select valid business category", {
        position: "top-center",
        theme: "colored",
      });
      setButtonDisable(false);
      return;
    }

    formData.append("name", eventName);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("seeking", searchTerm);
    formData.append("image", image);
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);
    formData.append("date", date);
    formData.append("token", localStorage.getItem("token"));

    try {
      const response = await axios.post(
        `${ENDPOINT}/api/chat/create`,
        formData
      );

      const data = response.data;
      console.log("data : ", data);
      localStorage.setItem("roomId", data.roomId);
      navigate(`/event/${data.roomId}`);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  useEffect(() => {}, [addressList]);

  const setCurrentLocation = () => {
    setLocationLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude: latitude, longitude: longitude });
      });
      setLocationLoading(false);

      toast.success("Location set successfully", {
        position: "top-center",
        theme: "colored",
      });
    } else {
      console.log("Location sharing isn't possible due to network issue!");
    }
  };

  const handleCancelEvent = () => {
    navigate("/mainpage");
  };

  return (
    <>
      <Navbar />

      <div className="main-create-event-container">
        <div className="create-event-image">
          <img src={CreateEventImage} alt="image" />
        </div>

        <div className="create-event-informations">
          <h1>List your business 🎉</h1>
          <p>
            Expand your business by reaching to more and more peoples around
            you.
          </p>

          <label className="image-picker" htmlFor="file-input">
            {imageSelectToggle ? (
              <div className="image-selection-info">
                <label>
                  <i className="fa-solid fa-circle-check image-selection-svg"></i>
                </label>
                <label>Image selected</label>
              </div>
            ) : (
              <div className="image-selection-info">
                <label>
                  <i className="fa-solid fa-upload image-upload-icon"></i>
                </label>
                <label htmlFor="file-input">Choose an image</label>
              </div>
            )}
          </label>

          <input
            type="file"
            id="file-input"
            name="image"
            onChange={handleImageChange}
          ></input>

          <div className="fill-room-details">
            <input
              type="text"
              placeholder="Business name"
              value={eventName}
              onChange={handleEventNameChange}
              className="event-name-input"
            ></input>
            <textarea
              type="text"
              className="event-description-input"
              placeholder="Description"
              value={description}
              row={100}
              onChange={handleDescriptionChange}
            ></textarea>

            <div className="main-search-container create-event-search">
              <input
                type="text"
                value={searchTerm}
                onChange={handleCategoryChange}
                placeholder="Yours business category"
              />
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="address-field">
              <div className="address-field-container">
                <input
                  type="text"
                  className="address-input"
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                ></input>
              </div>
            </div>

            <input
              type="date"
              className="date-input"
              placeholder="Event date"
              onChange={(e) => setDate(e.target.value)}
            ></input>

            <button
              className="create-button set-business-address-button"
              onClick={setCurrentLocation}
            >
              {locationLoading ? (
                <div className="create-button-loader">
                  <Loader /> &nbsp; Setting location
                </div>
              ) : (
                <div>
                  <i className="fa-solid fa-location-dot"></i> &nbsp; Set
                  current location as your business location
                </div>
              )}
            </button>

            <div className="mt-4 flex justify-end pb-10">
              <button onClick={handleCancelEvent} className="mr-4">
                Cancel
              </button>
              <button
                disabled={buttonDisable}
                onClick={handleCreateEvent}
                className="create-button"
              >
                {buttonDisable ? (
                  <div className="create-button-loader">
                    <Loader />
                  </div>
                ) : (
                  <div>Create</div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default CreateEvent;
