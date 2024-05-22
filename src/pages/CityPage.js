import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ThirdContainer from "../components/ThirdContainer";
import "./CityPage.css";
import FirstNav from "../components/FirstNav";
import SiteLogo from "../images/main-logo-png.png";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

const CityPage = (props) => {
  const ENDPOINT = props.backendURL;
  const { cityinfo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const latitude = queryParams.get("lat");
  const longitude = queryParams.get("lon");

  useEffect(()=>{
    ReactGA.pageview(window.location.pathname);
  },[])

  const slides = [
    {
      image: "https://img4.nbstatic.in/tr:w-2800/627b4e163b031b000b774d60.jpg",
      caption: "Slide 1",
    },
    {
      image: "https://img4.nbstatic.in/tr:w-2800/627b4e033b031b000b774d5f.jpg",
      caption: "Slide 2",
    },
    {
      image: "https://img4.nbstatic.in/tr:w-2800/61166f0a40e9df000b66f90b.jpg",
      caption: "Slide 3",
    },
    {
      image: "https://img4.nbstatic.in/tr:w-2800/61166f731e2731000b703940.jpg",
      caption: "Slide 4",
    },
    {
      image: "https://img4.nbstatic.in/tr:w-2800/611670111e2731000b703943.jpg",
      caption: "Slide 5",
    },
    {
      image: "https://img4.nbstatic.in/tr:w-2800/643550d63ddca9000be2a8d2.jpg",
      caption: "Slide 6",
    },
    {
      image: "https://img4.nbstatic.in/tr:w-2800/611670ba40e9df000b66f911.jpg",
      caption: "Slide 7",
    },
  ];

  const redirectCityServicePage = (serviceName) => {
    navigate(
      `/city-service/${cityinfo}/${serviceName}/${latitude}/${longitude}`
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Eventlabs - Services in {cityinfo}</title>
        <link
          rel="canonical"
          href={`https://eventlabs-frontend.vercel.app/city/${cityinfo}?lat=${latitude}&lon=${longitude}`}
        />
        <meta name="description" content={`Explore the best services in ${cityinfo}. Find top-rated electricians, plumbers, florists, decorators, and more. All services at your fingertips on Eventlabs.`} />
      </Helmet>

      <FirstNav />

      <div className="main-city-page-container">
        <div className="heading-logo">
          <div className="site-logo">
            <img src={SiteLogo} alt="site-logo" />
          </div>
          <h1 className="city-name-heading">Services in {cityinfo} |</h1>
        </div>

        <Carousel slides={slides} />

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Events and Parties 🎉</h2>
            <div onClick={() => redirectCityServicePage("Events and Parties")}>
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>

          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Events and Parties"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Electricians</h2>
            <div onClick={() => redirectCityServicePage("Electricians")}>
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>

          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Electricians"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Marriage and Catering</h2>
            <div
              onClick={() => redirectCityServicePage("Marriage and Catering")}
            >
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Marriage and Catering"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Fitness Services</h2>
            <div onClick={() => redirectCityServicePage("Fitness Services")}>
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Fitness Services"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Cleaning Services</h2>
            <div onClick={() => redirectCityServicePage("Cleaning Services")}>
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Cleaning Services"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Flower and Decorations</h2>
            <div
              onClick={() => redirectCityServicePage("Flower and Decorations")}
            >
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Flower and Decorations"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Plumbers</h2>
            <div onClick={() => redirectCityServicePage("Plumbers")}>
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Plumbers"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Pet Care Services</h2>
            <div onClick={() => redirectCityServicePage("Pet Care Service")}>
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Pet Care Service"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Hostels and PGs</h2>
            <div onClick={() => redirectCityServicePage("Hostels and PGs")}>
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Hostels and PGs"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>

        <div className="city-service-container">
          <div className="main-service-name-heading">
            <h2 className="service-name-heading">Textile services</h2>
            <div onClick={() => redirectCityServicePage("Textile Services")}>
              More <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <ThirdContainer
            backendURL={ENDPOINT}
            interest="Textile Services"
            latitude={latitude}
            longitude={longitude}
            cityname={cityinfo}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CityPage;
