import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

const MyMap = (props) => {
  const ENDPOINT = props.backendURL;
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const getNearby = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ENDPOINT}/api/chat/getNearbyEvents`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            interest: props.eventName,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setBusinesses(json.nearbyChatRooms);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    getNearby();
  }, []);

  const position = {
    lat: localStorage.getItem("latitude"),
    lng: localStorage.getItem("longitude"),
  };

  const icon = L.icon({
    iconUrl: "./mappin.png",
    iconSize: [30, 30],
  });

  return (
    <>
      {!loading ? (
        <MapContainer center={position} zoom={13} style={{width:'100%', height:'100%'}}>
          <TileLayer
            url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=awq6SDa4yLKXcaB5TCLa"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MarkerClusterGroup>
            {businesses.map((event, index) => (
              <Marker
                key={index}
                position={[event.location.coordinates[1], event.location.coordinates[0]]}
                icon={icon}
              >
                <Popup>{event.name}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      ) : (

        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
          Wait a little, plotting map...
        </div>
      )} 
    </>
  );
};

export default MyMap;
