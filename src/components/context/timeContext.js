import React, { createContext, useState } from "react";
import moment from "moment";

export const TimeContext = createContext();

//this moment object of this context changes on manipulating the calendar
export const TimeContextProvider = ({ children }) => {
  const [time, setTime] = useState(moment());

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      {children}
    </TimeContext.Provider>
  );
};
