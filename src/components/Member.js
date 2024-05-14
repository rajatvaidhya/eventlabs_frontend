import React from "react";
import "./Member.css";
import { Link } from "react-router-dom";

const Member = (props) => {
    // const ENDPOINT = "https://eventlabs-backend.onrender.com";
    // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = process.env.ENDPOINT;

  return (
    <Link to={`/user/${props.id}`}>
        <div className="member-box-container">
          <img src={`${ENDPOINT}/api/auth/photo/${props.id}`} alt="" />

          <div className="content-member">
            <h1>{props.name}</h1>
            <p>{props.number}</p>
          </div>
        </div>
    </Link>
  );
};

export default Member;
