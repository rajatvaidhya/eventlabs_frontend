import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./MainPage.css";
import FirstNav from "../components/FirstNav";
import SecondSection from "../components/SecondSection";
import FourthSection from "../components/FourthSection";
import Carousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
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

  if (isLoading) {
    return null;
  }

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
