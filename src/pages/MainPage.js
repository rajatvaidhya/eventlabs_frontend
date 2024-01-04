import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./MainPage.css";
import FirstNav from "../components/FirstNav";
import SecondSection from "../components/SecondSection";
import FourthSection from "../components/FourthSection";
import Carousel from "../components/Carousel";

const MainPage = () => {
  const [searchItem, setSearchItem] = useState("");

  const slides = [
    {
      image: "https://img4.nbstatic.in/tr:w-2800/6544c0ca41a952000cf5c94f.jpg",
      caption: "Slide 1",
    },
    {
      image: "https://img4.nbstatic.in/tr:w-2800/6512c7b0aa3610000c481afa.jpg",
      caption: "Slide 2",
    },
  ];

  return (
    <>
      <FirstNav />
      <Navbar setSearchItem={setSearchItem} />
      <Carousel slides={slides} />

      {searchItem === "" ? (
        <div>
          <div className="event-parties-container">
            <h2 className="event-parties-heading">Your businesses</h2>
            <SecondSection />
          </div>

          <div className="event-parties-container">
            <h2 className="event-parties-heading">
              {" "}
              Events and Parties near you! 🎉{" "}
            </h2>
            <FourthSection interest="Events and Parties" />
          </div>

          <div className="event-parties-container">
            <h2 className="event-parties-heading">Salons and Spa</h2>
            <FourthSection interest="Spa and Salons" />
          </div>

          <div className="event-parties-container">
            <h2 className="event-parties-heading">Electronic services</h2>
            <FourthSection interest="Electricians" />
          </div>

          <div className="event-parties-container">
            <h2 className="event-parties-heading">
              {" "}
              Marriage and Catering services{" "}
            </h2>
            <FourthSection interest="Marriage and Catering" />
          </div>

          <div className="event-parties-container">
            <h2 className="event-parties-heading">Fitness services</h2>
            <FourthSection interest="Fitness Services" />
          </div>
        </div>
      ) : (
        <div className="event-parties-container">
          <h2 className="event-parties-heading">{searchItem} near you!</h2>
          <FourthSection interest={searchItem} />
        </div>
      )}
    </>
  );
};

export default MainPage;
