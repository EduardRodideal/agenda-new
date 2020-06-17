import React, { createContext, useState } from "react";

export const RenderContext = createContext();

//this context manage the appearance of the calendar
export const RenderContextProvider = ({ children }) => {
  //on true it shows the days of the current month
  const [month, setMonth] = useState(true);
  //on true it shows the months of the year in the calendar
  const [months, setMonths] = useState(false);
  //on true it shows 12 years in the calendar
  const [years, setYears] = useState(false);
  //if true show no details for tasks, if true shows the details for a specific task
  const [empty, setEmpty] = useState(true);

  return (
    <RenderContext.Provider
      value={{
        month,
        setMonth,
        months,
        setMonths,
        years,
        setYears,
        empty,
        setEmpty,
      }}
    >
      {children}
    </RenderContext.Provider>
  );
};
