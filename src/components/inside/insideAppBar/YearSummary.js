import React, { useContext, useState } from "react";
import { CurrentTimeContext } from "../../context/currentTimeContext";
import moment from "moment";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Card } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
const StyledMenu = withStyles({
  paper: {
    border: "0px solid blue",
  },
})((props) => (
  <Menu
    elevation={12}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export const YearSummary = () => {
  //shows always the current time
  const { currentTime } = useContext(CurrentTimeContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentMoment, setCurrentMoment] = useState(moment());
  const [startMoment, setStartMoment] = useState(moment().startOf("year"));
  const [endMoment, setEndMoment] = useState(moment().endOf("year"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCurrentMoment(moment());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Summary of the year">
        <Button
          aria-controls="customized-menu"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          {currentTime.date()} {currentTime.month() + 1} {currentTime.year()}
        </Button>
      </Tooltip>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <Typography className="bold-title">
                Total Weeks: {endMoment.diff(startMoment, "weeks")}{" "}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} className="8past-left-font">
            <Typography className="past-left-font">Elapsed:</Typography>
          </Grid>
          <Grid item xs={6} className="8past-left-font">
            <Typography className="past-left-font">Left</Typography>
          </Grid>
          <Grid item xs={6} className="8past-left-font">
            <Typography className="past-left-font">
              {currentMoment.diff(startMoment, "weeks")}{" "}
            </Typography>
          </Grid>
          <Grid item xs={6} className="8past-left-font">
            <Typography className="past-left-font">
              {endMoment.diff(currentMoment, "weeks")}{" "}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Card>
              <Typography className="bold-title">
                Total Days: {endMoment.diff(startMoment, "days")}{" "}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Typography className="past-left-font">Elapsed:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">Left:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">
              {currentMoment.diff(startMoment, "days")}{" "}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">
              {endMoment.diff(currentMoment, "days")}{" "}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Card>
              <Typography className="bold-title">
                Total Hours: {endMoment.diff(startMoment, "hours")}{" "}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">Elapsed:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">Left:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">
              {currentMoment.diff(startMoment, "hours")}{" "}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">
              {endMoment.diff(currentMoment, "hours")}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Card>
              <Typography className="bold-title">
                Total Minutes: {endMoment.diff(startMoment, "minutes")}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Typography className="past-left-font">Elapsed:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">Left:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">
              {currentMoment.diff(startMoment, "minutes")}{" "}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className="past-left-font">
              {endMoment.diff(currentMoment, "minutes")}{" "}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Card>
              <Typography className="bold-title">
                Total Seconds: {endMoment.diff(startMoment, "seconds")}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Typography className="past-left-font">Elapsed:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">Left:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="past-left-font">
              {currentMoment.diff(startMoment, "seconds")}{" "}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className="past-left-font">
              {endMoment.diff(currentMoment, "seconds")}{" "}
            </Typography>
          </Grid>
        </Grid>
      </StyledMenu>
    </div>
  );
};
