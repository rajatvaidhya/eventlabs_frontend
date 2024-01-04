import React, { useEffect, useState } from "react";
import "./UserProfile.css"
import "./EventPage.css";
import Modal from "react-modal";
import ImageCard from "../components/ImageCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RequirementsComponents from "../components/RequirementsComponents";
import MemberCard from "../components/MemberCard";
import Loader from "../components/Loader";

const EventPage = () => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const { eventId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [roomAddress, setRoomAddress] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomDate, setRoomDate] = useState("");
  const [members, setMembers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [imageSelect, setImageSelect] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState();
  const [posts, setPosts] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [currentRatings, setCurrentRatings] = useState(0);
  const [activeComponent, setActiveComponent] = useState("Posts");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  return (
    <>
      <div className="main-event-profile-container">
        <div className="event-info">
          <div className="event-info-img">
            <img src="https://picsum.photos/1000/1000" />
          </div>

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
              <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {roomName}
              </h2>
            </div>
            <p style={{ color: "rgb(124, 124, 124)" }}>{roomAddress}</p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "0.8rem",
                color: "rgb(124, 124, 124)",
              }}
            >
              <p>
                Owned by : {admin.firstName} {admin.lastName}
              </p>

              <p>·</p>

              <p>Contact : {admin.phoneNumber}</p>

              {roomDate !== "" ? <p>· &nbsp; Event date : {roomDate}</p> : ""}
            </div>
            <p style={{ marginTop: "1rem" }}>{roomDescription}</p>

            <div className="ratings">
              <button onClick={() => setRatingModal(true)}>Rate us</button>

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
            requirements={requirements}
            adminId={adminId}
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
          className="modal"
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
      </div>
    </>
  );
};

export default EventPage;
