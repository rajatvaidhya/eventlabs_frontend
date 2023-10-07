import React from "react";
import { useLightMode } from "../contexts/LightModeContext";

const FelxiFooter = () => {
  const { toggleLightMode, setToggleLightMode } = useLightMode();

  return (
    <div
      style={{
        padding: "10px",
        textAlign: "center",
        fontSize: "12px",
        paddingTop: "3rem",
        backgroundColor: toggleLightMode ? "white" : "black",
        color: toggleLightMode ? "black" : "white",
      }}
    >
      <h1>
        Developed With
        {toggleLightMode ? <span> 💕 </span> : <span> 💚 </span>}
        By <span>Rajat Vaidhya</span>
      </h1>
    </div>
  );
};

export default FelxiFooter;
