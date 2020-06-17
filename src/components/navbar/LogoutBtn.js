import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GeneralContext } from "../context/generalContext";

//Material-ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export const LogoutBtn = () => {
  //used to redirect to different pages
  const history = useHistory();
  //when it is true opens the click away listener
  const [open, setOpen] = useState(false);
  //when the session expires alert becomes true and  the Logout button is disabled
  const { alert } = useContext(GeneralContext);

  //gets the token from localStorage
  const token = localStorage.FBIdToken;

  //handels click on Logout button
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  //handels when we click outside the Logout button
  const handleClickAway = () => {
    setOpen(false);
  };

  //Logs out the user
  const handleClickYes = (event) => {
    localStorage.clear();
    history.push("/");
    setOpen((prev) => !prev);
  };

  //avoids to logout the user
  const handleClickNo = () => {
    setOpen((prev) => !prev);
  };

  //handels the click inside the message under the button
  const handleClickIn = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="btnNav">
        {/**the Logout button */}
        <Button disabled={alert} color="inherit" onClick={handleClick}>
          Logout
        </Button>
        {/**when open is true it shows the container below */}
        {open ? (
          <Grid onClick={handleClickIn} className="gridNav" container>
            <Grid item xs={12}>
              {token ? (
                <Typography className="typography">
                  Do you want to logout? <br />
                  {/**this button logs out the user */}
                  <Button
                    onClick={handleClickYes}
                    className="ml-2"
                    variant="contained"
                  >
                    Yes
                  </Button>
                  {/**this button avoids to log out the user*/}
                  <Button
                    onClick={handleClickNo}
                    className="ml-2"
                    variant="contained"
                  >
                    No
                  </Button>
                </Typography>
              ) : (
                <Typography className="typography">
                  You are not logged in.
                </Typography>
              )}
            </Grid>
          </Grid>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};
