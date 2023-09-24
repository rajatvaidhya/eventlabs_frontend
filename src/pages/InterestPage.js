import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./InterestPage.css";
import axios from "axios";
import { useLightMode } from "../contexts/LightModeContext";

const InterestSelectionPage = () => {
  
  const ENDPOINT = "https://eventlabs-backend.onrender.com";
  // const ENDPOINT = "http://localhost:5000";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [imageSelect, setImageSelect] = useState(false);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const {toggleLightMode} = useLightMode();
  const [availableInterests, setAvailableInterests] = useState([
    "Hiking",
    "Cooking",
    "Photography",
    "Yoga",
    "Reading",
    "Sports",
    "Art",
    "Music",
    "Social",
  ]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInterestSelect = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);
  };

  const handleInterestRemove = (interest) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest));
  };

  const filteredInterests = availableInterests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("image", image); 
    formData.append("interests", selectedInterests);
    
    try {
      const response = await axios.post(`${ENDPOINT}/api/auth/interest-selection`, formData);
      if(response){
        console.log(response.data)
      }
      navigate("/mainpage");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageSelect(true);
    console.log(e.target.files[0]);
  };

  return (
    <>
      <Navbar />

      <div className="main-interest-container" style={{backgroundColor:toggleLightMode?'#BEFFF7':'black', color:toggleLightMode?'black':'white'}}>
        <label className="file-input-container-interest" htmlFor="file-input">
          {!imageSelect ? (
            <div className="upload-texts">
              <i
                className="fa-solid fa-upload"
                style={{ fontSize: "2rem" }}
              ></i>
              <label>Click to upload profile picture</label>
            </div>
          ) : (
            <div className="upload-texts">
              <i
                className="fa-solid fa-circle-check"
                style={{ fontSize: "2rem", color: "lightgreen" }}
              ></i>
              <label>Profile picture uploaded successfully</label>
            </div>
          )}
        </label>

        <input
          type="file"
          id="file-input"
          name="image"
          onChange={handleImageChange}
          style={{ display: "none" }}
        ></input>

        <div className="interest-form">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            Select Your Interests
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for interests"
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="interest-tags-container">
            {filteredInterests.map((interest) => (
              <div
                key={interest}
                className="interest-tags"
                style={{color:toggleLightMode?'black':'white'}}
                onClick={() => handleInterestSelect(interest)}
              >
                {interest}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Selected Interests</h3>
            <div
              className="flex flex-wrap"
              style={{ justifyContent: "center", gap: "0.5rem" }}
            >
              {selectedInterests.map((interest) => (
                <div
                  key={interest}
                  className="interest-tags"
                  onClick={() => handleInterestRemove(interest)}
                  style={{ border: "1px solid rgb(11, 196, 67)" }}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn continue-btn"
            onClick={handleClick}
            style={{ marginTop: "2rem" }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default InterestSelectionPage;
