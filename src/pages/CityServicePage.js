import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirstNav from "../components/FirstNav";
import SiteLogo from "../images/main-logo-png.png";
import "./CityServicePage.css";
import CartLoader from "../components/CartLoader";
import EventCard from "../components/EventCard";
import ReactGA from 'react-ga';
import { Helmet } from "react-helmet";

const CityServicePage = (props) => {
  const ENDPOINT = props.backendURL;
  const { cityinfo, serviceName, latitude, longitude } = useParams();
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getNearby = async () => {
      const response = await fetch(`${ENDPOINT}/api/chat/getCityEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interest: serviceName,
          latitude: latitude,
          longitude: longitude,
        }),
      });

      const json = await response.json();
      setBusinesses(json.nearbyChatRooms);
      setLoading(false);
    };

    getNearby();
  }, [cityinfo]);

  useEffect(()=>{
    ReactGA.pageview(window.location.pathname);
  },[])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {serviceName} in {cityinfo}
        </title>
        <link
          rel="canonical"
          href={`https://eventlabs-frontend.vercel.app/city-service/${cityinfo}/${serviceName}/${latitude}/${longitude}`}
        />
        <meta name="description" content={`Explore the best services in ${cityinfo}. Find top-rated electricians, plumbers, florists, decorators, and more. All services at your fingertips on Eventlabs.`} />
      </Helmet>
      
      <FirstNav />

      <div className="site-logo city-service-page-logo">
        <img src={SiteLogo} alt="site-logo" />
      </div>

      <div className="main-city-service-container">
        <h2 className="main-city-service-container-heading">
          {serviceName} in {cityinfo}
        </h2>

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
                <div className="city-services-grid">
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

export default CityServicePage;
