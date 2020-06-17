import React from "react";
import { SixHours } from "../inside/bigBody/SixHours";

export const Evening = () => {
  //the hours of the day from 18 to 23 respectively
  const hours = [18, 19, 20, 21, 22, 23];
  return <SixHours hours={hours} />;
};
