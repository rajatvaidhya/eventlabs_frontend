import React, { useEffect, useState } from "react";
import "./SecondSection.css";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import CartLoader from "./CartLoader";

const SecondSection = () => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    const getNearby = async () => {
      const response = await fetch(`${ENDPOINT}/api/chat/getYourEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      const json = await response.json();
      setBusinesses(json.chatRooms);
      console.log(json.chatRooms);
      setLoading(false);
    };

    getNearby();
  }, []);

  return (
    <>
      <div className="second-section-main-container">
        <div>
          {loading ? (
            <div className="cart-loader">
              <CartLoader />
            </div>
          ) : (
            <div>
              {businesses.length === 0 ? (
                <div className="event-parties-grid text404">
                  You have no business{" "}
                  <span className="create-now-second">
                    <Link to="/create-event">Create now!</Link>
                  </span>
                </div>
              ) : (
                <div className="event-parties-grid">
                  {businesses.map((business) => (
                    <EventCard
                      key={business._id}
                      id={business._id}
                      name={business.name}
                      location={business.address}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SecondSection;
