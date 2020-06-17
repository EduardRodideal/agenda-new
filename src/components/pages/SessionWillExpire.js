import React, { useContext } from "react";
import { GeneralContext } from "../context/generalContext";

//Material-ui

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export const SessionWillExpire = () => {
  //used to set the willExpire to false again
  const { setWillExpire } = useContext(GeneralContext);

  //handles the click on button that informs the user that the session will expire in 3 minutes
  const handleClick = () => {
    setWillExpire((prev) => !prev);
  };

  return (
    //i need to refactor this return not very wise done
    <Grid className="sessionExpired" container>
      <Grid className="sessionInfo" container>
        <Grid item xs>
          <Paper className="p-3">
            <Typography>
              Your session will expire in 3 minutes, please save your work.
            </Typography>
            <Typography align="center">
              <Button onClick={handleClick} variant="contained" color="primary">
                Ok
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
