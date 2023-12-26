import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import ImageCard from "../components/ImageCard";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

const UserProfile = () => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const { userId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState();
  const [user, setUser] = useState({});
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([]);
  const [imageSelect, setImageSelect] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      const response = await axios.post(
        `${ENDPOINT}/api/user/addPost`,
        formData
      );
      if (response) {
        console.log(response.data);
      }
      navigate(`/mainpage`);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const fetchUserData = async () => {
    const response = await fetch(`${ENDPOINT}/api/user/fetchUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });

    const data = await response.json();
    setUser(data.user);
  };

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/api/user/posts/${userId}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageSelect(true);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  useEffect(() => {
    fetchUserData();
    fetchAllPosts();
  }, []);

  return (
    <>
      <div className="main-profile-div">
        <div className="user-info">
          <div className="user-image">
            <img src={`${ENDPOINT}/api/auth/photo/${userId}`}></img>
          </div>

          <div className="user-creds" style={{ color: "white" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <i
                className="fa-solid fa-circle-check"
                style={{ fontSize: "1.3rem", color: "rgb(11, 196, 67)" }}
              ></i>
            </div>

            <div style={{ display: "flex", gap: "1rem", color: "#7c7c7c" }}>
              <p>{user.email}</p>
              <p>·</p>
              <p>{user.phoneNumber}</p>
              <p>·</p>
              <p>Profile visitors : 1.1K</p>
            </div>

            <p className="user-description">
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
            </p>

            <div style={{display:'flex', gap:'3rem', alignItems:'center', marginTop:'1.3rem'}}>
              <button>Chat with me</button>

              <div style={{display:'flex', gap:'0.4rem', color:'#FFD700', alignItems:'center'}}>
              <p style={{marginRight:'1rem', color:'white'}}>EL Rating : </p>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="user-work-images">
          <div>
            {posts.length === 0 ? (
              <p style={{ color: "white" }}>Haven't uploaded any post</p>
            ) : (
              <div className="image-grid">
                {posts.map((post) => (
                  <ImageCard
                    key={post._id}
                    postId={post._id}
                    imageOf="user"
                    caption={post.caption}
                    image={post.image}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    phoneNumber={user.phoneNumber}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {localStorage.getItem("userId") === userId ? (
          <div className="sticky-button-container" onClick={openModal}>
            <button className="sticky-button">
              <i className="fa-solid fa-upload"></i>
              <p> Add post </p>
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
            >
              Upload
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UserProfile;
