import React, { useState, useContext } from "react";

import AppIcon from "../../images/pngwave.png";
import axios from "axios";
import { Link } from "react-router-dom";

import { GeneralContext } from "../context/generalContext";
import { SessionExpired } from "./SessionExpired";

//Material-ui stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Login = (props) => {
  //holds the state of the email typed
  const [email, setEmail] = useState("");
  //holds the state of the passsword typed
  const [password, setPassword] = useState("");
  //if true shows the loading circle
  const [loading, setLoading] = useState(false);
  //contains all the errors when login is incorrect
  const [errors, setErrors] = useState({});
  //disables the Login button when the session expires
  //and hides the Login page
  const { alert } = useContext(GeneralContext);

  //contains the email and pasword to be sent to the datebase
  const userData = {
    email,
    password,
  };

  //this address is used in order to solve the cross origin problem
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  //sends the credentials to the server
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        proxyurl +
          "https://europe-west3-agenda-idealante.cloudfunctions.net/api/login",
        userData
      )
      .then((res) => {        
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setLoading(false);
        props.history.push("/agenda");
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  //handels the typing of the email and password
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <>
      {!alert && (
        //this is the whole Login page
        <Grid container className="form">
          <Grid item sm />
          <Grid item sm>
            <img src={AppIcon} alt="agenda" className="image" />
            {/**the book image */}
            <Typography variant="h2" className="pageTitle">
              Login
            </Typography>
            <form noValidate onSubmit={handleSubmit}>
              {/**the email field */}
              <TextField
                className="textField"
                id="email"
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={handleChange}
                fullWidth
                helperText={errors.email}
                error={errors.email ? true : false}
              />
              {/**the password field */}
              <TextField
                className="textField"
                id="password"
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={handleChange}
                fullWidth
                helperText={errors.password}
                error={errors.password ? true : false}
              />
              {/**shows a message when the wrong credentials a typed */}
              {errors.general && (
                <Typography variant="body2" className="customError">
                  {errors.general}
                </Typography>
              )}
              {/**the Login button on the page */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="button"
                disabled={loading}
              >
                Login
                {/**when the page is loading shows the circular progress on the Login button */}
                {loading && (
                  <CircularProgress
                    size={30}
                    color="secondary"
                    className="progress"
                  />
                )}
              </Button>
              <br />
              <small>
                Don't have an account ? sign up <Link to="/signup">here</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      )}
      {alert && <SessionExpired />}
    </>
  );
};
