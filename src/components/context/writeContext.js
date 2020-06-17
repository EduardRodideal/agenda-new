import React, { createContext, useState } from "react";

export const WriteContext = createContext();

//context for todo items
export const WriteContextProvider = ({ children }) => {
  //state for the title of the item
  const [title, setTitle] = useState("");
  //state for description of the item
  const [description, setDescription] = useState("");
  //state for the hour of the item
  const [hour, setHour] = useState("07:30");
  //hour as a number for datebase
  const [momentHour, setMomentHour] = useState(7);
  //year month day of the task in datebase
  const [date, setDate] = useState("20201128");
  //all the items for a specific user
  const [items, setItems] = useState([]);
  //holds the details for one item
  const [itemDetails, setItemDetails] = useState({});
  return (
    <WriteContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        hour,
        setHour,
        momentHour,
        setMomentHour,
        date,
        setDate,
        items,
        setItems,
        itemDetails,
        setItemDetails,
      }}
    >
      {children}
    </WriteContext.Provider>
  );
};
