import React, { useState } from "react";
import { useLightMode } from "../contexts/LightModeContext";
import "./DropDown.css";

const DropDown = ({ options, onSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleLightMode } = useLightMode();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    toggleDropdown();
  };

  return (
    <div className="custom-dropdown">
      <div
        className="dropdown-header"
        onClick={toggleDropdown}
        style={{
          backgroundColor: toggleLightMode ? "rgb(190 251 249)" : "black",
          color: toggleLightMode ? "black" : "white",
        }}
      >
        {selectedOption}
        <i className={`fa ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
      </div>
      {isOpen && (
        <ul
          className="dropdown-options"
          style={{
            backgroundColor: toggleLightMode ? "rgb(190 251 249)" : "black",
            color: toggleLightMode ? "black" : "white",
          }}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={selectedOption === option ? "selected" : ""}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
