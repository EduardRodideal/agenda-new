import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  //when it is true, renders a message that warns the use
  //that the session is expired
  const [alert, setAlert] = useState(false);
  //when it is true, renders a message that warns the user
  //that the session will expire in 3 minutes
  const [willExpire, setWillExpire] = useState(false);

  //state for username
  const [username, setUsername] = useState("");
  //state for imageUrl
  const [imageUrl, setImageUrl] = useState("");
  //used to mimic event listener from firebase
  const [update, setUpdate] = useState(false);
  //used to toggle dark or light mode
  const [darkLight, setDarkLight] = useState("light")

  return (
    <GeneralContext.Provider
      value={{
        alert,
        setAlert,
        willExpire,
        setWillExpire,
        username,
        setUsername,
        imageUrl,
        setImageUrl,
        update,
        setUpdate,
        darkLight,
        setDarkLight,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
