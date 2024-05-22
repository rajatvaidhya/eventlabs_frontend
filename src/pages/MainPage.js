import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./MainPage.css";
import FirstNav from "../components/FirstNav";
import SecondSection from "../components/SecondSection";
import FourthSection from "../components/FourthSection";
import Carousel from "../components/Carousel";
import MyMap from "../components/Map";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

const MainPage = (props) => {
  const ENDPOINT = props.backendURL;
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [eventName, setEventName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, []);

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

  const handleMapModal = (eventname) => {
    setEventName(eventname);
    setModalIsOpen(true);
  };

  useEffect(() => {
    console.log(eventName);
  }, [eventName]);

  if (isLoading) {
    return null;
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search nearby services - Eventlabs</title>
        <link rel="canonical" href="https://eventlabs-frontend.vercel.app" />
        <meta
          name="description"
          content={`Explore the best services in your city. Find top-rated electricians, plumbers, florists, decorators, and more. All services at your fingertips on Eventlabs.`}
        />
      </Helmet>

      <FirstNav backendURL={props.backendURL} />
      <Navbar backendURL={props.backendURL} setSearchItem={setSearchItem} />
      <Carousel slides={slides} />

      {searchItem === "" ? (
        <div>
          <div className="event-parties-container">
            <div className="event-parties-heading">
              <h2>Events and Parties near you! 🎉</h2>
              <p onClick={() => handleMapModal("Events and Parties")}>
                <i className="fa-solid fa-map-pin"></i> Map
              </p>
            </div>
            <FourthSection
              interest="Events and Parties"
              backendURL={props.backendURL}
            />
          </div>

          <div className="event-parties-container">
            <div className="event-parties-heading">
              <h2>Salons and Spa</h2>
              <p onClick={() => handleMapModal("Spa and Salons")}>
                <i className="fa-solid fa-map-pin"></i> Map
              </p>
            </div>
            <FourthSection
              interest="Spa and Salons"
              backendURL={props.backendURL}
            />
          </div>

          <div className="event-parties-container">
            <div className="event-parties-heading">
              <h2>Electronic services</h2>
              <p onClick={() => handleMapModal("Electricians")}>
                <i className="fa-solid fa-map-pin"></i> Map
              </p>
            </div>
            <FourthSection
              interest="Electricians"
              backendURL={props.backendURL}
            />
          </div>

          <div className="event-parties-container">
            <div className="event-parties-heading">
              <h2>Marriage and Catering services </h2>
              <p onClick={() => handleMapModal("Marriage and Catering")}>
                <i className="fa-solid fa-map-pin"></i> Map
              </p>
            </div>
            <FourthSection
              interest="Marriage and Catering"
              backendURL={props.backendURL}
            />
          </div>

          <div className="event-parties-container">
            <div className="event-parties-heading">
              <h2>Fitness services</h2>
              <p onClick={() => handleMapModal("Fitness Services")}>
                <i className="fa-solid fa-map-pin"></i> Map
              </p>
            </div>
            <FourthSection
              interest="Fitness Services"
              backendURL={props.backendURL}
            />
          </div>

          <div className="event-parties-container">
            <div className="event-parties-heading">
              <h2>Your businesses</h2>
            </div>
            <SecondSection backendURL={props.backendURL} />
          </div>
        </div>
      ) : (
        <div className="event-parties-container">
          <h2 className="event-parties-heading">{searchItem} near you!</h2>
          <FourthSection interest={searchItem} backendURL={props.backendURL} />
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Details"
        className="map-modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <MyMap eventName={eventName} backendURL={ENDPOINT} />
      </Modal>
    </>
  );
};

export default MainPage;
