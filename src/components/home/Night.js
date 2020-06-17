import React from "react";
import { SixHours } from "../inside/bigBody/SixHours";

export const Night = () => {
  //the hours of the day from 0 to 5 respectively
  const hours = [0, 1, 2, 3, 4, 5];
  return <SixHours hours={hours} />;

  
};
