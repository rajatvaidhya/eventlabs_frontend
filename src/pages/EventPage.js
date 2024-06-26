import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import "./EventPage.css";
import Modal from "react-modal";
import ImageCard from "../components/ImageCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RequirementsComponents from "../components/RequirementsComponents";
import MemberCard from "../components/MemberCard";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

const EventPage = (props) => {
  const ENDPOINT = props.backendURL;

  const { eventId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [roomAddress, setRoomAddress] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomDate, setRoomDate] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [members, setMembers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [imageSelect, setImageSelect] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState();
  const [posts, setPosts] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [currentRatings, setCurrentRatings] = useState(0);
  const [activeComponent, setActiveComponent] = useState("Posts");
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("change");

  const navigate = useNavigate();

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleUpdateInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ENDPOINT}/api/chat/updateChatRoomData`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: eventId,
          roomName: roomName,
          roomDescription: roomDescription,
          roomAddress: roomAddress,
          status: selectedStatus,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      window.location.reload();
    } catch (error) {
      console.error("Error updating chat room data:", error);
    }
  };

  const fetchChatRoomData = async () => {
    const response = await fetch(`${ENDPOINT}/api/chat/getChatRoomData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: eventId }),
    });

    if (response.ok) {
      const data = await response.json();
      setRoomName(data.chatRoom.name);
      setRoomAddress(data.chatRoom.address);
      setRoomDescription(data.chatRoom.description);
      setAdminId(data.chatRoom.createdBy);
      setRoomDate(data.chatRoom.scheduledDate);
      setRoomStatus(data.chatRoom.status);
      setCurrentRatings(data.chatRoom.averageRating);

      const uniqueUserIds = [];

      const uniqueUsers = data.users.filter((user) => {
        if (!uniqueUserIds.includes(user._id)) {
          uniqueUserIds.push(user._id);
          return true;
        }
        return false;
      });

      setMembers(uniqueUsers);
      setAdmin(data.admin);
    } else {
      console.error("Failed to add user to chat room");
    }
  };

  const handleClick = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("eventId", eventId);
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      const response = await axios.post(
        `${ENDPOINT}/api/chat/addPost`,
        formData
      );
      if (response) {
        console.log(response.data);
      }

      window.location.reload();
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/api/user/posts/${eventId}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchAllRequirements = async () => {
    try {
      const response = await fetch(
        `${ENDPOINT}/api/requirements/fetchRequirements/${eventId}`
      );
      const data = await response.json();
      setRequirements(data);
    } catch (error) {
      console.error("Error fetching chat room data:", error);
    }
  };

  useEffect(() => {
    fetchChatRoomData();
    fetchAllPosts();
    fetchAllRequirements();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageSelect(true);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const showPosts = () => {
    setActiveComponent("Posts");
  };

  const showRequirements = () => {
    setActiveComponent("Requirements");
  };

  const PostsComponent = () => (
    <div className="event-work-images">
      <div>
        {posts.length === 0 ? (
          <p style={{ color: "white" }}>Haven't uploaded any post</p>
        ) : (
          <div className="image-grid">
            {posts.map((post) => (
              <ImageCard
                key={post._id}
                backendURL={ENDPOINT}
                postId={post._id}
                imageOf="event"
                eventId={eventId}
                caption={post.caption}
                image={post.image}
                firstName={roomName}
                lastName=""
                phoneNumber=""
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const handleRate = async () => {
    const response = await fetch(`${ENDPOINT}/api/chat/addRating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        ratings,
      }),
    });

    const data = await response.json();
    console.log(data);
    window.location.reload();
  };

  const setLiveLocation = async (longitude, latitude) => {
    const response = await fetch(`${ENDPOINT}/api/chat/updateEventLocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
        latitude: latitude,
        longitude: longitude,
      }),
    });

    const json = await response.json();

    if (json.success) {
      toast.success("Location set successfully.", {
        position: "top-center",
        theme: "colored",
      });
    } else {
      toast.error("Error updating location.", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleSetLocation = async () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function async(position) {
        const { latitude, longitude } = position.coords;
        setLiveLocation(longitude, latitude);
      });
    } else {
      console.log("Location sharing isn't possible due to network issue!");
    }

    setLoading(false);
  };

  const handleDeleteEvent = async () => {
    setLoading(true);
    const response = await fetch(`${ENDPOINT}/api/chat/deleteEvent`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: eventId,
      }),
    });

    const json = await response.json();

    if (json.success) {
      navigate("/mainpage");
    } else {
      setLoading(false);
      toast.error("Error deleting event.", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{roomName} - Eventlabs</title>
        <link
          rel="canonical"
          href={`https://eventlabs-frontend.vercel.app/event/${eventId}`}
        />
        <meta name="description" content={roomDescription} />
      </Helmet>

      {localStorage.getItem("userId") === adminId ? (
        <div
          className="update-info-button"
          onClick={() => setUpdateModal(true)}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </div>
      ) : (
        ""
      )}

      <div className="main-event-profile-container">
        <div className="event-info">
          <div className="event-info-img">
            <img src="https://picsum.photos/1000/1000" />
          </div>
          <div className="event-info-first-div">
            <div className="event-image">
              <img src={`${ENDPOINT}/api/chat/photo/${eventId}`}></img>
            </div>
            <div
              className="event-creds"
              style={{ width: "80%", marginTop: "2rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="room-name-heading">{roomName}</h2>
              </div>
              <p style={{ color: "rgb(124, 124, 124)" }}>{roomAddress}</p>

              <div className="event-wrapper">
                <div className="event-admin-details">
                  <p>
                    Owned by : {admin.firstName} {admin.lastName}
                  </p>

                  <h1>&nbsp;·&nbsp;</h1>

                  {/* <p>Contact : {admin.phoneNumber}</p> */}
                  <p
                    style={{
                      color: roomStatus == "Available" ? "green" : "red",
                    }}
                  >
                    {roomStatus}
                  </p>

                  <h1>&nbsp;·&nbsp;</h1>

                  {roomDate !== "" ? <p>Event date : {roomDate}</p> : ""}
                </div>

                <p style={{ marginTop: "1rem" }}>{roomDescription}</p>

                <div className="ratings">
                  {localStorage.getItem("userId") === adminId ? (
                    <button
                      onClick={handleSetLocation}
                      className="set-event-location-button"
                    >
                      {loading ? (
                        <div className="set-location-loader">
                          <Loader /> Setting Location
                        </div>
                      ) : (
                        <div>
                          <i className="fa-solid fa-location-dot"></i> &nbsp;
                          Set Location
                        </div>
                      )}
                    </button>
                  ) : (
                    <button onClick={() => setRatingModal(true)}>
                      Rate us
                    </button>
                  )}

                  {Array.from({ length: currentRatings }).map((_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                  ))}

                  {Array.from({ length: 5 - currentRatings }).map(
                    (_, index) => (
                      <i key={index} className="fa-regular fa-star"></i>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="event-wrapper-mobile">
            <div>
              <p>
                Owned by : {admin.firstName} {admin.lastName}
              </p>
              {/* <p>Contact : {admin.phoneNumber}</p> */}
              <p
                style={{
                  color: roomStatus == "Available" ? "green" : "red",
                }}
              >
                {roomStatus}
              </p>
              {roomDate !== "" ? <p>Event date : {roomDate}</p> : ""}
            </div>

            <p className="mobile-wrapper-desc">{roomDescription}</p>

            <div className="ratings">
              {localStorage.getItem("userId") === adminId ? (
                <button
                  onClick={handleSetLocation}
                  className="set-event-location-button"
                >
                  {loading ? (
                    <div className="set-location-loader">
                      <Loader /> Setting Location
                    </div>
                  ) : (
                    <div>
                      <i className="fa-solid fa-location-dot"></i> &nbsp; Set
                      Location
                    </div>
                  )}
                </button>
              ) : (
                <button onClick={() => setRatingModal(true)}>Rate us</button>
              )}

              {Array.from({ length: currentRatings }).map((_, index) => (
                <i key={index} className="fa-solid fa-star"></i>
              ))}

              {Array.from({ length: 5 - currentRatings }).map((_, index) => (
                <i key={index} className="fa-regular fa-star"></i>
              ))}
            </div>
          </div>
        </div>

        <div className="lazy-load-buttons">
          <button onClick={showPosts}>
            {" "}
            <i className="fa-regular fa-image"></i> Posts
          </button>
          <button onClick={showRequirements}>
            {" "}
            <i className="fa-solid fa-gear"></i> Services
          </button>
        </div>

        {activeComponent === "Posts" && <PostsComponent />}
        {activeComponent === "Requirements" && (
          <RequirementsComponents
            backendURL={ENDPOINT}
            requirements={requirements}
            adminId={adminId}
            phoneNumber={admin.phoneNumber}
          />
        )}

        {localStorage.getItem("userId") === adminId ? (
          <div className="sticky-button-container" onClick={openModal}>
            <button className="sticky-button">
              <i className="fa-solid fa-upload"></i>
              <p> Upload post on this event</p>
            </button>
          </div>
        ) : (
          ""
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Details"
          className="modal add-picture-modal"
          overlayClassName="overlay"
          ariaHideApp={false}
        >
          <div
            className="modal-content"
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="addpost-inputs">
              <label className="addpost-image-input" htmlFor="file-input">
                <div className="file-input-container-addpost">
                  {!imageSelect ? (
                    <div className="upload-texts">
                      <i
                        className="fa-solid fa-upload"
                        style={{ fontSize: "2rem" }}
                      ></i>
                      <label>Click to upload picture</label>
                    </div>
                  ) : (
                    <div className="upload-texts">
                      <i
                        className="fa-solid fa-circle-check"
                        style={{ fontSize: "2rem", color: "lightgreen" }}
                      ></i>
                      <label>Picture uploaded successfully</label>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="file-input"
                  name="image"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                ></input>
              </label>

              <div className="addpost-caption-input">
                <textarea
                  style={{ width: "100%", height: "100%", padding: "10px" }}
                  placeholder="Mention something about your post"
                  onChange={handleCaptionChange}
                ></textarea>
              </div>
            </div>

            <button
              className="submit-uploaded-image-info"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? (
                <div className="upload-post-button-loader">
                  <Loader />
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={ratingModal}
          onRequestClose={() => setRatingModal(false)}
          contentLabel="Image Details"
          className="rating-modal"
          overlayClassName="overlay"
          ariaHideApp={false}
        >
          <h2 className="rating-modal-heading">
            <i className="fa-solid fa-star"></i> &nbsp; Rate us!
          </h2>
          <div className="modal-content">
            <select
              value={ratings}
              onChange={(e) => {
                setRatings(e.target.value);
              }}
            >
              <option value={0}>Select Rating</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <div className="add-rating-button">
            <button className="create-button" onClick={handleRate}>
              Rate
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={updateModal}
          onRequestClose={() => setUpdateModal(false)}
          contentLabel="Image Details"
          className="update-modal"
          overlayClassName="overlay"
          ariaHideApp={false}
        >
          <div className="update-modal-content">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <textarea
              type="text"
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
            />
            <input
              type="text"
              value={roomAddress}
              onChange={(e) => setRoomAddress(e.target.value)}
            />
            <select
              id="statusSelect"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="change">Change Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>

            <div className="update-modal-buttons">
              <button
                className="update-modal-button"
                onClick={handleUpdateInfo}
              >
                {loading ? <Loader /> : "Update"}
              </button>

              <button
                className="update-modal-button"
                style={{ backgroundColor: "red" }}
                onClick={handleDeleteEvent}
              >
                {loading ? <Loader /> : "Delete"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
};

export default EventPage;
