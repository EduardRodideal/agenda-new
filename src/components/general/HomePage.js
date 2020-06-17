import React, { useEffect, useContext } from "react";
import { Navbar } from "../home/Navbar";
import { Body } from "../home/Body";
import jwtDecode from "jwt-decode";
import { GeneralContext } from "../context/generalContext";
import { SessionExpired } from "../pages/SessionExpired";
import { SessionWillExpire } from "../pages/SessionWillExpire";

// Material UI
import Grid from "@material-ui/core/Grid";

export const HomePage = () => {
  const { setAlert, alert, willExpire, setWillExpire } = useContext(
    GeneralContext
  );

  //when session expires it redirects to login page
  useEffect(() => {
    //gets the token from localStorage
    const token = localStorage.FBIdToken;
    //decodes the web token, that is an object
    const decodedToken = jwtDecode(token);

    //use for testing represents 15 seconds
    //const time = decodedToken.exp * 1000 - Date.now() - 3585 * 1000;

    //the token expires in one hour and it is set in seconds
    const time = decodedToken.exp * 1000 - Date.now();

    //this method will run after approximately one hour
    setTimeout(() => {
      setAlert((prev) => !prev);
    }, time);
    return () => clearTimeout();
  }, [setAlert]); //i used here empty brackets, and i got a warning, but i think
  //if i will use the missing dependency, it will be ok, because this method never changes

  //when we have left only 3 minutes until the session will expire
  useEffect(() => {
    const token = localStorage.FBIdToken;
    const decodedToken = jwtDecode(token);
    //use for testing represents 5 seconds
    //const time = decodedToken.exp * 1000 - Date.now() - 3595 * 1000;

    //3 minutes before the token expires
    const time = decodedToken.exp * 1000 - Date.now() - 180 * 1000;

    setTimeout(() => {
      setWillExpire((prev) => !prev);
    }, time);
    return () => clearTimeout();
  }, [setWillExpire]); //i used here empty brackets, and i got a warning, but i think
  //if i will use the missing dependency, it will be ok, because this method never changes

  return (
    <Grid className="homeTop" container spacing={1}>
      {alert && <SessionExpired />}
      {willExpire && <SessionWillExpire />}
      <Navbar />
      <Body />
    </Grid>
  );
};
