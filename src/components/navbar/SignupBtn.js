import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GeneralContext } from "../context/generalContext";

//Material-ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export const SignupBtn = () => {
  //used to redirect to different pages
  const history = useHistory();
  //when it is true, opens the click away listener
  const [open, setOpen] = useState(false);
  //when the session expires alert becomes true and the Signup button is disabled
  const { alert } = useContext(GeneralContext);

  //handels click on Signup button
  const handleClick = () => {
    const token = localStorage.FBIdToken;
    if (token) {
      setOpen((prev) => !prev);
    } else {
      history.push("/signup");
    }
  };

  //handels when we click outside the Signup button
  const handleClickAway = () => {
    setOpen(false);
  };

  //handels the click inside the message under the button
  const handleClickIn = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="btnNav">
        {/**the Home button */}
        <Button disabled={alert} color="inherit" onClick={handleClick}>
          Signup
        </Button>
        {/**when open is true it shows the container below */}
        {open ? (
          <Grid onClick={handleClickIn} className="gridNav" container>
            <Grid item xs={12}>
              <Typography className="typography">
                You are loged in. If you wand to signup, please first log out.
              </Typography>
            </Grid>
          </Grid>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};
