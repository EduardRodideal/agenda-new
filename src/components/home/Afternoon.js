import React from "react";
import { SixHours } from "../inside/bigBody/SixHours";

export const Afternoon = () => {
  //clock hours from 12 to 17
  const hours = [12, 13, 14, 15, 16, 17];
  return <SixHours hours={hours} />;
};
