import React, { useEffect, useState } from "react";
import "./RequirementsCard.css";
import Modal from "react-modal";

const RequirementsCard = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [apply, setApply] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequirementUsers = async () => {
    const response = await fetch(
      `${ENDPOINT}/api/requirements/fetchRequirementUsers/${props.id}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const users = await response.json();
      setUsers(users);
      setLoading(false);
    } else {
      console.log(response.err);
    }
  };

  const openModal = () => {
    setLoading(true);
    fetchRequirementUsers();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${ENDPOINT}/api/requirements/deleteRequirement/${props.id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        console.log("Requirement deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting requirement", error);
    }
  };

  const handleApply = async () => {
    const response = await fetch(
      `${ENDPOINT}/api/requirements/applyRequirement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirementId: props.id,
          userId: localStorage.getItem("userId"),
        }),
      }
    );

    if (response.ok) {
      console.log("Apply success");
    } else {
      console.log(response.err);
    }
  };

  useEffect(() => {
    props.appliedBy.map((ids) => {
      if (localStorage.getItem("userId") === ids) {
        setApply(false);
      }
    });
  }, []);

  return (
    <>
      <div className="rc-card-div">
        <div onClick={handleDelete} className="delete-requirement">
          {localStorage.getItem("userId") === props.adminId ? (
            <i className="fa-solid fa-circle-minus"></i>
          ) : (
            ""
          )}
        </div>

        <div className="main-requirement-card-div">
          <div className="requirement-title">
            <h2>{props.title}</h2>

            {localStorage.getItem("userId") === props.adminId ? (
              <button onClick={openModal}>Status</button>
            ) : (
              <div>
                {apply ? (
                  <button onClick={handleApply}>Apply</button>
                ) : (
                  <button disabled>Applied</button>
                )}
              </div>
            )}
          </div>

          <div className="posts-number">
            <h1>{props.numberOfPosts}</h1>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Details"
        className="modal require-users-modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="status-modal-container">
          <h1>Applied by {users.length} Peoples</h1>

          <div className="status-modal-container-members">
            {loading ? (
              <p>Loading ...</p>
            ) : (
              <div>
                {users.map((user) => (
                  <div className="modal-member" key={user.id}>
                    <img src="https://picsum.photos/60/60" alt="User Avatar" />
                    <div className="member-info">
                      <p>
                        {user.firstName} {user.lastName}
                      </p>
                      <p>{user.phoneNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RequirementsCard;
