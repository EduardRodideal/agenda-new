import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GeneralContext } from "../context/generalContext";

//Material-ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export const HomeBtn = () => {
  //used to redirect to different pages
  const history = useHistory();
  //when it is true opens the click away listener
  const [open, setOpen] = useState(false);
  //when the session expires alert becomes true and  the Home button is disabled
  const { alert } = useContext(GeneralContext);

  //handels click on Home button
  const handleClick = () => {
    const token = localStorage.FBIdToken;
    if (token) {
      history.push("/agenda");
    } else {
      history.push("/agenda");
      //setOpen((prev) => !prev);
    }
  };

  //handels when we click outside the Home button
  const handleClickAway = () => {
      setOpen(false);
  }

  //handels the click inside the message under the button
  const handleClickIn = () => {
      setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="btnNav">
        {/**the Home button */}
        <Button disabled={alert} color="inherit" onClick={handleClick}>
          Agenda
        </Button>
        {/**when open is true it shows the container below */}
        {open ? (
          <Grid onClick={handleClickIn} className="gridNav" container>
            <Grid item xs={12}>
              <Typography className="typography">
                You must first to login
              </Typography>
            </Grid>
          </Grid>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};


