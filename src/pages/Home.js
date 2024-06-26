import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import DarkModeImage from "../images/8217095.jpg";
import LightModeImage from "../images/imgonline-com-ua-Rotate360-osbMT9fa3KSXqU.jpg";
import HomeImage2 from "../images/homeimage2.jpg";
import HomeImage3 from "../images/homeimage3.jpg";
import { useNavigate } from "react-router-dom";
import FelxiFooter from "../components/FelxiFooter";
import FourthImage from "../images/aisearch-hi.png"
import Footer from "../components/Footer";
import ReactGA from "react-ga";
import IshaniImage from "../images/CommentCardImage1.jpeg"
import ShivamImage from "../images/CommentCardImage2.jpeg"
import PushtiImage from "../images/CommentCardImage3.jpeg"
import UshaImage from "../images/CommentCardImage4.jpeg"
import PureshwarImage from "../images/CommentCardImage5.jpg"
import DharmImage from "../images/CommentCardImage6.jpeg"

const Home = () => {
  const navigate = useNavigate();
  
  const [serviceIndex, setServiceIndex] = useState(0);
  const services = ["Events & Parties", "Salons & Spas", "Catering Services", "Electricians", "Plumbers", "Pet Services"];
  const [animationClass, setAnimationClass] = useState("animate-pop");

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
      setAnimationClass("animate-pop"); // Apply animation class on text change
      setTimeout(() => setAnimationClass(""), 2000); // Remove animation class after 1 second
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);

  const handleClick = () => {
    navigate("/signup");
  };

  const CommentCard = (props) => {
    return (
      <div className="second-card">
        <div className="second-card-comment">
          <h2>{props.comment}</h2>
        </div>
        <div className="second-card-bottom">
          <img src={props.image} />
          <div>
            <h3>{props.name}</h3>
            <p>{props.location}</p>
          </div>
        </div>
      </div>
    );
  };

  const Third = () => {
    return (
      <div>
        <h1>
          Find the <span>right experts</span>
        </h1>
        <p className="third-text">
          Get help from top personalized experts near you!
        </p>

        <div className="third-input-container">
          <input
            type="text"
            placeholder="Search here to get nearby results"
          ></input>
          <h2>Search</h2>
        </div>

        <div className="third-grid">
          <div className="third-card">
            <p className="third-card-head">Find nearby parties and events</p>
            <p className="third-card-bottom">
              I am looking for nearby parties in London
            </p>
          </div>

          <div className="third-card">
            <p className="third-card-head">Find nearby salons & spas</p>
            <p className="third-card-bottom">
              I am looking for nearby salons in London
            </p>
          </div>
        </div>

        <div className="third-grid" style={{ marginBottom: "5rem" }}>
          <div className="third-card">
            <p className="third-card-head">Find nearby electricians</p>
            <p className="third-card-bottom">
              I am looking for nearby electricians in London
            </p>
          </div>

          <div className="third-card">
            <p className="third-card-head">Find nearby decoration service</p>
            <p className="third-card-bottom">
              I am looking for nearby decorators in London
            </p>
          </div>
        </div>
      </div>
    );
  };

  useEffect(()=>{
    ReactGA.pageview(window.location.pathname);
  },[])

  return (
    <>
      <Navbar />

      <div
        className="main-home-container"
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <div className="first" style={{ position: "relative" }}>
          <img src={DarkModeImage} alt="Background" />

          <div className="first-div" style={{ color: "white" }}>
            {/* <h1>Discover <span className="gradient-heading">Nearby Services</span> and Participate in Local Events</h1> */}
            <h1>
              Discover Nearby <div className={`gradient-heading ${animationClass}`}>{services[serviceIndex]}</div>
            </h1>

            <p style={{ marginTop: "2rem" }}>
              Looking for reliable service professionals in your area? Look no
              further than Eventlabs. We're your go-to destination for finding
              top-notch service businesses nearby, whether you need an
              electrician, plumber, salon, spa, and much more. With our
              user-friendly platform and verified listings, finding the perfect
              service provider has never been easier.
            </p>
            <button
              onClick={handleClick}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="third">
          <Third />
        </div>

        <div className="second">
          <h1>Peoples love using eventlabs</h1>

          <div className="second-grid">
            <div className="slider slider2">
              <div className="slide slide2">
                <CommentCard
                  name="Dharmishtha Sharma"
                  image={DharmImage}
                  location="Rau, Indore"
                  comment="Eventlabs helped me discover exciting local events I never knew about!"
                />
              </div>

              <div className="slide slide2">
                <CommentCard
                  name="Pushti Harsola"
                  image={PushtiImage}
                  location="Indore, MP"
                  comment="I love how easy it is to book salon appointments through Eventlabs!"
                />
              </div>

              <div className="slide slide2">
                <CommentCard
                  name="Ishani Malviya"
                  image={IshaniImage}
                  location="Barwani, MP"
                  comment="Thanks to Eventlabs, I found a fantastic plumber in no time!"
                />
              </div>

              <div className="slide slide2">
                <CommentCard
                  name="Pureshwar Gonekar"
                  image={PureshwarImage}
                  location="Chhindwara, MP"
                  comment="Eventlabs made finding a reliable electrician a breeze!"
                />
              </div>

              <div className="slide slide2">
                <CommentCard
                  name="Usha Arya"
                  image={UshaImage}
                  location="Indore, MP"
                  comment="I highly recommend Eventlabs for anyone in need of quality service professionals."
                />
              </div>

              <div className="slide slide2">
                <CommentCard
                  name="Shivam Sharma"
                  image={ShivamImage}
                  location="Rajgarh, MP"
                  comment="Eventlabs is my go-to for all things service-related. So convenient and efficient!"
                />
              </div>
            </div>
          </div>
        </div>




        <div className="fourth">
          <div>
            <img src={FourthImage}/>
          </div>
          <div>
            <h1>Grow your business</h1>
            <p>List your business on eventlabs</p>
          </div>
          <div onClick={()=>navigate("/signup")}>
            <h2>Get Listed</h2>
          </div>
        </div>
      </div>

      <Footer/>

      <FelxiFooter />
    </>
  );
};

export default Home;
