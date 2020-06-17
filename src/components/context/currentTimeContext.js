import React, { createContext, useState } from "react";
import moment from "moment";

export const CurrentTimeContext = createContext();

//this context always shows the current time
export const CurrentTimeContextProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  return (
    <CurrentTimeContext.Provider value={{ currentTime, setCurrentTime }}>
      {children}
    </CurrentTimeContext.Provider>
  );
};
