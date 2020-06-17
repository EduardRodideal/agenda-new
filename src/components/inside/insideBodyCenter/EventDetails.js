import React, { useContext } from "react";
import { WriteContext } from "../../context/writeContext";
import { RenderContext } from "../../context/renderContext";
import { EditEvent } from "../insideBodyCenter/EditEvent";
import axios from "axios";

//Material-ui stuff
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";

//renders the details of a meeting
export const EventDetails = () => {
  //holds the details of an item that is shown on the screen
  const { itemDetails, setItemDetails, items } = useContext(WriteContext);
  const { setEmpty } = useContext(RenderContext);
  //deletes an item from the user agenda
  const handleDelete = () => {
    //this url solves the cross origin problem
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //get authentication token from localStorage
    const token = localStorage.FBIdToken;
    //heders for cloud function
    const config = {
      headers: {
        Authorization: token,
      },
    };
    //the url where to send the POST request
    const url =
      proxyurl +
      "https://europe-west3-agenda-idealante.cloudfunctions.net/api/item/delete";

    //body of the request
    const itemToDelete = { createdAt: itemDetails.createdAt };
    axios
      .post(url, itemToDelete, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    setItemDetails({});
    setEmpty(true);
    //the length of the array
    const length = items.length;
    //delete an item from the array of items
    for (let i = 0; i < length; i++) {
      if (items[i].createdAt === itemDetails.createdAt) {
        items[i] = {};
      }
    }
  };

  //hides the details of an item
  const handleClose = () => {
    setEmpty(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className="bold">Title: </Typography>
        {itemDetails.title}
      </Grid>
      <Grid item xs={12}>
        <Typography className="bold">Description: </Typography>
        {itemDetails.description}
      </Grid>
      <Grid item xs={12}>
        <Typography className="bold">Date: </Typography>
        {itemDetails.dateFormat} {itemDetails.hour}
      </Grid>
      <Grid item xs={12}>
        <EditEvent />
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close">
          <IconButton onClick={handleClose}>
            <HighlightOffIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
