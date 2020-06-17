import React from "react";
import { SixHours } from "../inside/bigBody/SixHours";

export const Morning = () => {
  //the hours of the day from 6 to 11 respectively
  const hours = [6, 7, 8, 9, 10, 11];
  return <SixHours hours={hours} />;
};
