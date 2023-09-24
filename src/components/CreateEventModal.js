import React, { useEffect, useState } from "react";
import "./CreateEventModal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLightMode } from "../contexts/LightModeContext";

const CreateEventModal = ({ isOpen, onClose }) => {
  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [addressToggle, setAddressToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageSelectToggle, setImageSelectToggle] = useState(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const { toggleLightMode } = useLightMode();

  const navigate = useNavigate();

  const [selectedInterests, setSelectedInterests] = useState([]);
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

  const handleInterestSelect = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleInterestRemove = (interest) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest));
  };

  const filteredInterests = availableInterests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    const formData = new FormData();

    if (eventName.trim() === "") {
      alert("Please enter an event name.");
      return;
    }

    formData.append("name", eventName);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("seeking", selectedInterests);
    formData.append("image", image);
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);
    formData.append("token", localStorage.getItem("token"));

    try {
      const response = await axios.post(
        `${ENDPOINT}/api/chat/create`,
        formData
      );
      const data = {};

      if (response) {
        data = response.json();
        localStorage.setItem("roomId", data._id);
      }
      navigate(`/chat/${data._id}`);
    } catch (error) {
      console.error("Error uploading data:", error);
    }

    onClose();
  };

  useEffect(() => {}, [addressList]);

  const handleKeyDown = (e) => {
    if (address.trim() !== "") {
      setLoading(true);
      setAddressToggle(true);

      const params = {
        q: address,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0,
      };

      const queryString = new URLSearchParams(params).toString();
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setLoading(false);
          setAddressList(JSON.parse(result));
        })
        .catch((err) => console.log("error", err));
      setAddress("");
    }
  };

  const handleListItemClick = (lat, lon, displayName) => {
    setAddressToggle(false);
    setAddress(displayName);
    setLocation({ latitude: lat, longitude: lon });
  };

  return (
    <div
      className={`real-modal fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center z-50`}
    >
      <div
        className="modal-container"
        style={{
          backgroundImage: toggleLightMode
            ? "linear-gradient(45deg, #6499E9, #9EDDFF)"
            : "linear-gradient(45deg, #47ffd1, #128a02)",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <div className="modal-content">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{
              marginTop: "2rem",
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Create an Event 🎉
          </h2>

          <div className="main-modal-container">
            <label className="image-picker" htmlFor="file-input">
              {imageSelectToggle ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <label>
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ fontSize: "2rem", color: "lightgreen" }}
                    ></i>
                  </label>
                  <label>Image selected</label>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <label>
                    <i
                      className="fa-solid fa-upload"
                      style={{ fontSize: "2rem" }}
                    ></i>
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
              style={{ display: "none" }}
            ></input>
            <div className="fill-room-details">
              <input
                type="text"
                placeholder="Event name"
                value={eventName}
                onChange={handleEventNameChange}
              ></input>
              <textarea
                type="text"
                className="description"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>

              <div className="mt-4">
                <h3>Looking for :</h3>
                <div
                  className="flex flex-wrap"
                  style={{ marginBottom: "1rem", gap: "10px" }}
                >
                  {selectedInterests.map((interest) => (
                    <div
                      key={interest}
                      className="seeking-tags"
                      style={{
                        border: "1px solid rgb(11, 196, 67)",
                        padding: "6px",
                        fontSize: "14px",
                        width: "30%",
                      }}
                      onClick={() => handleInterestRemove(interest)}
                    >
                      <i
                        className="fa-solid fa-xmark"
                        style={{
                          float: "left",
                          justifyContent: "center",
                          marginTop: ".2rem",
                          marginLeft: ".4rem",
                          display: "block",
                        }}
                      ></i>
                      {interest}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {filteredInterests.map((interest) => (
                    <div
                      key={interest}
                      className="seeking-tags"
                      onClick={() => handleInterestSelect(interest)}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>

              <div className="address-field">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Address (Click on icon to load)"
                    value={address}
                    onChange={handleAddressChange}
                  ></input>
                  <i
                    style={{
                      marginLeft: "-2rem",
                      fontSize: "1.3rem",
                      cursor: "pointer",
                    }}
                    onClick={handleKeyDown}
                    className="fa-solid fa-location-dot"
                  ></i>
                </div>

                {addressToggle &&
                  (loading ? (
                    <h1>Address Loading...</h1>
                  ) : (
                    <div className="address-list">
                      <ul>
                        {addressList.map((item) => (
                          <li
                            key={item.osm_id}
                            onClick={() =>
                              handleListItemClick(
                                item.lat,
                                item.lon,
                                item.display_name
                              )
                            }
                          >
                            {item.display_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
              <input
                type="number"
                placeholder="Notify in Radius (Variable upto 1-2 km)"
              ></input>
            </div>
          </div>

          <div
            className="mt-4 flex justify-end"
            style={{ marginRight: "2rem", marginTop: "1.4rem" }}
          >
            <button onClick={onClose} className="mr-4">
              Cancel
            </button>
            <button onClick={handleCreateEvent} className="create-button">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
