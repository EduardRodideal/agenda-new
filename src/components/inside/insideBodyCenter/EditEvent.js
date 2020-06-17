import React, { useState, useContext, useEffect } from "react";
import { WriteContext } from "../../context/writeContext";
import { TimeContext } from "../../context/timeContext";
import { GeneralContext } from "../../context/generalContext";
import axios from "axios";

import { FaRegClock, FaAlignLeft, FaPenAlt, FaTimes } from "react-icons/fa";

//Material-ui stuff
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import DescriptionIcon from "@material-ui/icons/Description";
import ScheduleIcon from "@material-ui/icons/Schedule";
import TitleIcon from "@material-ui/icons/Title";

const useStyles = makeStyles((theme) => ({
  paper: {
    //margin: "240px",
    marginLeft: "12.5%",
    //marginRight: "auto%",
    marginTop: "100px",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 6, 2, 2),
    top: "40%",
    left: "30%",
    borderRadius: "30px",
    outlineStyle: "none",
    boxShadow:
      "8px 8px 8px 8px rgba(2, 4, 4, 0.1), 0 6px 20px 0 rgba(1, 0, 0, 0.19);",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 120,
  },
}));
//this component renders dialog for setting a meeting
export const EditEvent = () => {
  const classes = useStyles();

  //a moment object, holds the time chosen by the user
  const { time } = useContext(TimeContext);

  //used to mimic event listener from firebase
  const { setUpdate } = useContext(GeneralContext);

  const [open, setOpen] = useState(false);

  //this variables are the state for title,
  //description and hour.
  const {
    title,
    setTitle,
    description,
    setDescription,
    hour,
    setHour,
    momentHour,
    setMomentHour,
    date,
    setDate,
    itemDetails,
    setItemDetails,
  } = useContext(WriteContext);

  //initialising the title, description and hour
  useEffect(() => {
    setTitle(itemDetails.title);
    setDescription(itemDetails.description);
    setHour(itemDetails.hour);
  }, []);

  //opens the Modal
  const handleOpen = () => {
    setOpen(true);
  };

  //closes the Modal
  const handleClose = () => {
    setOpen(false);
  };

  //updates the title when the user types it
  const handleChangeTitle = (event) => {
    const value = event.target.value;
    setDate("" + time.year() + time.month() + time.date());
    setTitle(value);
  };

  //updates the description when the user types it
  const handleChangeDescription = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  //updates the hour when the user change it
  const handleChangeHour = (event) => {
    const value = event.target.value;
    const numberHour = parseInt(value.split(":")[0]);
    setHour(value);
    setMomentHour(numberHour);
  };

  //constains the item details sent to the datebase
  const itemDetailsConst = {
    description,
    title,
    hour,
    momentHour,
    createdAt: itemDetails.createdAt,
    date,
    dateFormat:
      time.year() + " " + time.format("MMMM") + " " + time.date() + " hour: ",
  };

  //this address is used in order to solve the cross origin problem
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  //authentication token
  const token = localStorage.FBIdToken;
  //headers for POST request if we have protected route
  const config = {
    headers: {
      Authorization: token,
    },
  };

  //create the url where to send the request
  const url =
    proxyurl +
    "https://europe-west3-agenda-idealante.cloudfunctions.net/api/item/edit";

  //sends the item details to the datebase
  const handleClickSave = (event) => {
    event.preventDefault();
    axios
      .post(url, itemDetailsConst, config)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
    setOpen(false);
    setUpdate((prev) => !prev);

    //sets the details updated
    setItemDetails({
      description,
      title,
      hour,
      dateFormat: itemDetails.dateFormat,
      createdAt: itemDetails.createdAt,
    });
  };

  //this is all that the Modal contains
  const body = (
    <div className={classes.paper}>
      {/**contanins the whole modal */}
      <Grid container spacing={3}>
        {/**the icon x (cross) */}
        <Grid justify="flex-end" container>
          <Grid item xs={1}>
            <Tooltip title="Close">
              <IconButton>
                <HighlightOffIcon color="primary" onClick={handleClose} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {/**the title and the icon  */}
        <Grid alignItems="flex-end" container>
          <Grid item xs={1}>
            <Typography align="center">
              <TitleIcon color="primary" />
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <TextField
              onChange={handleChangeTitle}
              value={title}
              fullWidth={true}
              id="standard-basic"
              label="Title"
            />
          </Grid>
        </Grid>
        {/**icon and description */}
        <Grid item xs={12}>
          <Grid alignItems="flex-end" container>
            <Grid item xs={1}>
              <DescriptionIcon color="primary" />
            </Grid>
            <Grid item xs={11}>
              <TextareaAutosize
                className="aria"
                rowsMin={4}
                aria-label="empty textarea"
                placeholder="Description"
                value={description}
                onChange={handleChangeDescription}
              />
            </Grid>
          </Grid>
        </Grid>
        {/**icon and the clock field */}
        <Grid item xs={12}>
          <Grid alignItems="flex-end" container>
            <Grid item xs={1}>
              <ScheduleIcon color="primary" />
            </Grid>
            <Grid item xs={11}>
              <form className={classes.container} noValidate>
                <TextField
                  id="time"
                  label="Alarm clock"
                  type="time"
                  value={hour}
                  onChange={handleChangeHour}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
        {/**the save button */}
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={11}></Grid>
            <Grid item xs={1}>
              <Button variant="contained" color="primary" onClick={handleClickSave}>Save</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div className="display-edit">
      <Tooltip title="Edit">
        <IconButton onClick={handleOpen}>
          <EditIcon color="primary"  />
        </IconButton>
      </Tooltip>
      <Modal
        BackdropProps={{ invisible: true }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
