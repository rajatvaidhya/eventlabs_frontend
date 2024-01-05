import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

const FourthSection = (props) => {
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";

  const userId = localStorage.getItem("userId");

  const [businesses, setBusinesses] = useState([]);

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
    };

    getNearby();
  }, []);

  return (
    <>
      <div className="fourth-section-main-container">
        <div>
          {businesses.length === 0 ? (
            <div className="event-parties-grid text404">
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
      </div>
    </>
  );
};

export default FourthSection;
