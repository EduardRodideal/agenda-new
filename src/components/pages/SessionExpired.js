import React, { useContext } from "react";
import { GeneralContext } from "../context/generalContext";
import { useHistory } from "react-router-dom";

//Material-ui

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";



export const SessionExpired = () => {
  //used to redirect to different pages
  const history = useHistory();

  //used to set the alert to false again
  const {setAlert } = useContext(GeneralContext);

  //handles the click on button that informs the user that the session has expired
  const handleClick = () => {
    localStorage.clear();
    history.push("/");
    setAlert((prev) => !prev)
  }

  return (
    //i need to refactor this return not very wise done
    <Grid className="sessionExpired" container>
      <Grid className="sessionInfo" container>
        <Grid item xs>
          <Paper className="p-3">
            <Typography>
              Your session has expired. You need to login again
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


