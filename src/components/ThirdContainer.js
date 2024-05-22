import React, { useEffect, useState } from "react";
import "./ThirdContainer.css";
import EventCard from "./EventCard";
import CartLoader from "./CartLoader";

const ThirdContainer = (props) => {
  const ENDPOINT = props.backendURL;

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getNearby = async () => {
      const response = await fetch(`${ENDPOINT}/api/chat/getCityEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interest: props.interest,
          latitude:props.latitude,
          longitude:props.longitude
        }),
      });

      const json = await response.json();
      setBusinesses(json.nearbyChatRooms);
      setLoading(false);
    };

    getNearby();
  }, [props.cityname]);

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
                      backendURL={ENDPOINT}
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
