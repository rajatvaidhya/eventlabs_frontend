import React, { useState } from "react";
import { useLightMode } from "../contexts/LightModeContext";
import DropDown from "./DropDown";
import "./SecondSection.css";
import EventCard from "./EventCard";
import Loader from "./Loader";
import MyMap from "./Map";

const SecondSection = () => {
    const ENDPOINT = "https://eventlabs-backend.onrender.com";
    // const ENDPOINT = "http://localhost:5000";

  const userId = localStorage.getItem("userId");
  const [selectedOption, setSelectedOption] = useState("Select Interest");
  const [radius, setRadius] = useState(5);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toggleLightMode } = useLightMode();
  const options = [
    "Hiking",
    "Cooking",
    "Photography",
    "Yoga",
    "Reading",
    "Sports",
    "Art",
    "Music",
    "Social",
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSearch = async () => {
    console.log(userId);

    setLoading(true);

    const response = await fetch(`${ENDPOINT}/api/chat/getNearbyEvents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, interest: selectedOption, radius }),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data.nearbyChatRooms);
      setEvents(data.nearbyChatRooms);
      setLoading(false);
    } else {
      console.log("Error fetching nearyby events!");
    }
  };

  return (
    <div className="find-events-container" style={{ color: "white", borderBottom:toggleLightMode?'0.3px dashed rgb(196, 196, 196)':'0.3px dashed rgb(26,26,26)'}}>
      <h1 style={{ color: toggleLightMode ? "black" : "white" }}>
        Events happening inside <span className="dist">{radius}km</span> of
        radius from you
      </h1>

      <div className="room-search">
        <DropDown
          options={options}
          onSelect={handleSelect}
          selectedOption={selectedOption}
        />

        <input
          type="number"
          onChange={(e) => {
            setRadius(e.target.value);
          }}
          className="radius-search-bar"
          placeholder="Enter radius (variable upto 1-2km)"
          style={{
            backgroundColor: toggleLightMode ? "white" : "black",
            color: toggleLightMode ? "black" : "white",
          }}
        ></input>
        <button
          className="search-button"
          type="submit"
          onClick={handleSearch}
          style={{
            backgroundColor: toggleLightMode ? "#ff444f" : "rgb(11, 196, 67)",
            color: "white",
          }}
        >
          {" "}
          Search
        </button>
      </div>

      <div className="event-cards">
        {loading ? (
          <div style={{display:'flex', margin:'auto', marginTop:'4rem', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'1rem'}}>
          <div>
            <Loader color={toggleLightMode?"black":"white"}/>
          </div>
            <p style={{color:toggleLightMode?'black':'white', fontWeight:'bold'}}>Loading nearby events ...</p>
          </div>
        ) : (
          events.map((room, index) => (
            <EventCard
              key={index}
              name={room.name}
              location={room.address}
              image={room.image}
              id={room._id}
            />
          ))
        )}
      </div>

      {events.length > 0 && <MyMap events={events} />}
    </div>
  );
};

export default SecondSection;
