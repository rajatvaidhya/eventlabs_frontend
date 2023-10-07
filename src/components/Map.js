import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

const MyMap = (props) => {
  
  const position = {
    lat:localStorage.getItem('latitude'),
    lng:localStorage.getItem('longitude')
  }

  const [eventsMarkers, setEventsMarkers] = useState([]);

  const icon = L.icon({
    iconUrl: "./mappin.png",
    iconSize: [30, 30],
  });

  useEffect(() => {
    const modifiedArray = props.events.map((event) => ({
      geocode: [event.location.coordinates[1], event.location.coordinates[0]],
      popUp: event.name,
    }));

    setEventsMarkers(modifiedArray);
  }, [props.events]);

  return (
    <MapContainer center={position} zoom={13} style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'}}>
      <TileLayer
        url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=awq6SDa4yLKXcaB5TCLa"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup>
        {eventsMarkers.map((marker) => (
          <Marker position={marker.geocode} icon={icon} key={marker.geocode.join("-")}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MyMap;
