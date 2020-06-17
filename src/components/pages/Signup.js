import React, { useState } from "react";
import AppIcon from "../../images/pngwave.png";
import axios from "axios";
import { Link } from "react-router-dom";


//Material-ui stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";


export const Signup = (props) => {
  
  //state for the email typed by the user
  const [email, setEmail] = useState("");
  //state for the password typed by the user
  const [password, setPassword] = useState("");
  //state for the confirm password typed by the user
  const [confirmPassword, setConfirmPassword] = useState("");
  //state for the username typed by the user
  const [username, setUsername] = useState("");
  //when true shows the circle loading
  const [loading, setLoading] = useState(false);
  //state for all the errors received from the database
  const [errors, setErrors] = useState({});

  //user credentials that we sent to the database
  const newUserData = {
    email,
    password,
    confirmPassword,
    username,
  };

  //the address that solves the problem of cress origin policy
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  //sends all the data to the database
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        proxyurl +
          "https://europe-west3-agenda-idealante.cloudfunctions.net/api/signup",
        newUserData
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setLoading(false);
        props.history.push("/agenda");
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  //handels the typing of email, password ...
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "username") setUsername(value);
  };

  return (
    //contains the whole page
    <Grid container className="form">
      <Grid item sm />{/**this Grid is used in order to split the page into 3 equal Grids */}
      <Grid item sm>
        <img src={AppIcon} alt="agenda" className="image" />{/**the book image */}
        <Typography variant="h2" className="pageTitle">
          Signup
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
          {/**the confirm password field */}
          <TextField
            className="textField"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
          />
          {/**the username field */}
          <TextField
            className="textField"
            id="username"
            name="username"
            type="text"
            label="Username"
            value={username}
            onChange={handleChange}
            fullWidth
            helperText={errors.username}
            error={errors.username ? true : false}
          />
          {/**error message when wrong credentials a insered */}
          {errors.general && (
            <Typography variant="body2" className="customError">
              {errors.general}
            </Typography>
          )}
          {/**signup button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="button"
            disabled={loading}
          >
            Signup
            {/**loading circle on top of the button on the page is loading */}
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
            Already have an account ? login <Link to="/">here</Link>{/**the link to Login page */}
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};


