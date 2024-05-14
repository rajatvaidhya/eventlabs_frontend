import React from "react";
import "./MemberCard.css";
import { Link } from "react-router-dom";

const MemberCard = (props) => {

  // const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = process.env.ENDPOINT;

  return (
    <>
      <Link to={`/user/${props.id}`}>
        <div className="main-member-component-div">
          <div className="img-div">
            <img src={`${ENDPOINT}/api/auth/photo/${props.id}`}></img>
          </div>

          <div className="creds">
            <p className="name">
              {props.firstName} {props.lastName}
            </p>
            <p className="number">{props.phoneNumber}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MemberCard;
