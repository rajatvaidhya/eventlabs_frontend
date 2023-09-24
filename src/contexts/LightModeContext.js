import React, { createContext, useContext, useState } from 'react';

const LightModeContext = createContext();

export function LightModeProvider({ children }) {
  const [toggleLightMode, setToggleLightMode] = useState(false);

  return (
    <LightModeContext.Provider value={{ toggleLightMode, setToggleLightMode }}>
      {children}
    </LightModeContext.Provider>
  );
}

export function useLightMode() {
  return useContext(LightModeContext);
}