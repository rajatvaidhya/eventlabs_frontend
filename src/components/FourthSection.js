import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import CartLoader from "./CartLoader";

const FourthSection = (props) => {
  const ENDPOINT = props.backendURL;

  const userId = localStorage.getItem("userId");

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);
    
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
  }, [props.interest]);

  return (
    <>
      <div className="fourth-section-main-container">
        <div>
          {loading ? (
            <div className="cart-loader">
              <CartLoader />
            </div>
          ) : (
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
                      backendURL={ENDPOINT}
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

export default FourthSection;
