import React, { useEffect, useState } from "react";
import "./CreateEvent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useLightMode } from "../contexts/LightModeContext";

const CreateEvent = ({ isOpen, onClose }) => {
  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
  // const ENDPOINT = "https://eventlabs-backend.onrender.com";
  const ENDPOINT = "http://localhost:5000";

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [addressToggle, setAddressToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageSelectToggle, setImageSelectToggle] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
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
    setButtonDisable(true);
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

      const data = response.data;
      console.log("data : ",data);
      localStorage.setItem("roomId", data.roomId);
      navigate(`/chat/${data.roomId}`);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
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

  const handleCancelEvent = () => {
    navigate("/mainpage");
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          color: toggleLightMode ? "black" : "white",
          backgroundColor: toggleLightMode ? "white" : "black",
          minHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <h2
          className="text-2xl font-semibold"
          style={{
            paddingTop: "2rem",
            paddingBottom: "2rem",
            textAlign: "center",
            fontSize: "1.7rem",
            fontWeight: "bold",
            letterSpacing: "-1px",
            color: toggleLightMode ? "black" : "white",
            backgroundColor: toggleLightMode ? "white" : "black",
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
                    style={{
                      fontSize: "2rem",
                      color: toggleLightMode ? "black" : "white",
                    }}
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
              style={{
                backgroundColor: toggleLightMode ? "white" : "",
                border: toggleLightMode ? "1px solid #b9b9b9" : "",
              }}
              value={eventName}
              onChange={handleEventNameChange}
            ></input>
            <textarea
              type="text"
              className="description"
              placeholder="Description"
              value={description}
              style={{
                backgroundColor: toggleLightMode ? "white" : "",
                border: toggleLightMode ? "1px solid #b9b9b9" : "",
              }}
              onChange={handleDescriptionChange}
            ></textarea>

            <div className="mt-4">
              <h3 style={{ textAlign: "center" }}>Looking for :</h3>
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
                  style={{
                    width: "100%",
                    backgroundColor: toggleLightMode ? "white" : "",
                    border: toggleLightMode ? "1px solid #b9b9b9" : "",
                  }}
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
                          style={{
                            border: toggleLightMode
                              ? "1px solid #b9b9b9"
                              : "1px solid white",
                          }}
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
              style={{
                backgroundColor: toggleLightMode ? "white" : "",
                border: toggleLightMode ? "1px solid #b9b9b9" : "",
              }}
            ></input>

            <div className="mt-4 flex justify-end pb-10">
              <button onClick={handleCancelEvent} className="mr-4">
                Cancel
              </button>
              <button
                disabled={buttonDisable}
                onClick={handleCreateEvent}
                className="create-button"
                style={{
                  color: "white",
                  backgroundColor: toggleLightMode
                    ? "rgb(255, 68, 79)"
                    : "rgb(11, 196, 67)",
                }}
              >
                {buttonDisable ? 
                <div style={{display:'flex', justifyContent:'center'}}>
                  <Loader />
                  </div> : <div>Create</div>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
