import React, { useEffect, useState } from "react";
import "./ThirdContainer.css";
import EventCard from "./EventCard";
import CartLoader from "./CartLoader";

const ThirdContainer = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const userId = localStorage.getItem("userId");

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNearby = async () => {
      const response = await fetch(`${ENDPOINT}/api/chat/getNearbyEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          interest: props.interest,
        }),
      });

      const json = await response.json();
      setBusinesses(json.nearbyChatRooms);
      setLoading(false);
    };

    getNearby();
  }, []);

  return (
    <>
      <div className="third-section-main-container">
        <div>
          {loading ? (
            <div className="cart-loader">
              <CartLoader />
            </div>
          ) : (
            <div>
              {businesses.length === 0 ? (
                <div className="event-parties-grid">
                  No {props.interest} available.
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

export default ThirdContainer;
