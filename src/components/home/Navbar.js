import React, { useContext } from "react";
import { CurrentTimeContext } from "../context/currentTimeContext";
import { RenderContext } from "../context/renderContext";
import { TimeContext } from "../context/timeContext";
import { CreateEvent } from "../inside/insideAppBar/CreateEvent";
import { ImageAvatar } from "../inside/insideAppBar/ImageAvatar";
import { Link } from "react-router-dom";
import { UploadImage } from "../navbar/UploadImage";
import { DarkWhiteMode } from "../inside/insideAppBar/DarkWhiteMode";
import { YearSummary } from "../inside/insideAppBar/YearSummary";

// Material UI
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    marginLeft: "42rem",
    fontSize: "15px",
  },
  homeColor: {
    color: "black",
  },
}));

export const Navbar = () => {
  const classes = useStyles();

  //shows always the current time
  const { currentTime } = useContext(CurrentTimeContext);
  //this moment object will change depending on the user actions
  const { time, setTime } = useContext(TimeContext);
  //if setMonth(true) the calendar will show the month setMonths(true)
  //the months of the year and setYears(true) 12 years respectively
  const { setMonth, setMonths, setYears } = useContext(RenderContext);

  //renders the months of the year
  const handleMonthClick = () => {
    setMonth(false);
    setMonths(true);
    setYears(false);
  };

  //renders 12 years
  const handleYearClick = () => {
    setMonth(false);
    setMonths(false);
    setYears(true);
  };

  //renders 12 months
  const handleTodayClick = () => {
    const currentTimeClone = currentTime.clone();
    setTime(currentTimeClone);
    setMonth(true);
    setMonths(false);
    setYears(false);
  };

  return (
    //this is the navbar of the agenda
    <Grid container>
      <div className={classes.root}>
        <AppBar className="app-bar" position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Tooltip title="Has no implementation">
                <MenuIcon />
              </Tooltip>
            </IconButton>

            <YearSummary />

            <Tooltip title="Back to current day">
              <Button variant="contained" className="app-bar" onClick={handleTodayClick}>
                Today
              </Button>
            </Tooltip>

            <Tooltip title="Add a task">
              <Button className="app-bar">
                <CreateEvent />
              </Button>
            </Tooltip>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
              size="small"
            >
              <Tooltip title="Select a month">
                <Button className="app-bar" onClick={handleMonthClick}>
                  {time.format("MMM")}
                </Button>
              </Tooltip>
              <Tooltip title="Select a year">
                <Button className="app-bar" onClick={handleYearClick}>
                  {time.year()}
                </Button>
              </Tooltip>
            </ButtonGroup>
            <Typography variant="h6" className={classes.title}>
              {localStorage.username}
            </Typography>
            <ImageAvatar />
            <UploadImage />
            <DarkWhiteMode />
            <Link to="/">
              <Button className={classes.homeColor}>Home Page</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    </Grid>
  );
};
