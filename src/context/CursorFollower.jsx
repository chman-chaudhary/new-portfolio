import React, { createContext, useContext, useRef } from "react";

export const CursorFollowerContext = createContext(null);

export const CursorFollowerProvider = ({ children }) => {
  const cursorFollower = useRef(null);

  return (
    <CursorFollowerContext.Provider value={cursorFollower}>
      {children}
    </CursorFollowerContext.Provider>
  );
};

export const useCursorFollower = () => {
  return useContext(CursorFollowerContext);
};
