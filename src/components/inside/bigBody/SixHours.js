import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { WriteContext } from "../../context/writeContext";
import { TimeContext } from "../../context/timeContext";
import { RenderContext } from "../../context/renderContext";

//  material-UI import
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const SixHours = ({ hours }) => {
  //an array of 6 Grid items
  let allGridItems = [];

  //hods all the items of a specific user
  const { items, setItemDetails } = useContext(WriteContext);

  //the time chosen by the user
  const { time } = useContext(TimeContext);

  //if true shows now details of the items
  const { setEmpty } = useContext(RenderContext);

  //all items for this specific 6 hours
  const todayItems = items.filter(
    (item) =>
      item.date === "" + time.year() + time.month() + time.date() &&
      item.momentHour >= hours[0] &&
      item.momentHour <= hours[hours.length - 1]
  );

  //handels the click on the title of an item from the agenda
  const handleClickDetails = (
    title,
    description,
    hour,
    dateFormat,
    createdAt
  ) => {
    setItemDetails({
      title,
      description,
      hour,
      dateFormat,
      createdAt,
    });
    setEmpty(false);
  };

  //used for sorting an array of objects
  const compare = (a, b) => {
    const hourA = a.hour;
    const hourB = b.hour;

    let comparison = 0;
    if (hourA > hourB) {
      comparison = 1;
    } else if (hourA < hourB) {
      comparison = -1;
    }
    return comparison;
  };

  for (let i = 0; i < hours.length; i++) {
    //all the item for one hour
    const hourItems = todayItems.filter((item) => item.momentHour === hours[i]);
    
    hourItems.sort(compare);
    //all the items be render for one hour
    const itemsToRender = [];
    for (let j = 0; j < hourItems.length; j++) {
      itemsToRender.push(
        <Grid key={uuidv4()} className="border-blue" item xs>
          <Paper
            onClick={() =>
              handleClickDetails(
                hourItems[j].title,
                hourItems[j].description,
                hourItems[j].hour,
                hourItems[j].dateFormat,
                hourItems[j].createdAt
              )
            }
            elevation={2}
            align="center"
          >
            <Typography variant="overline">{hourItems[j].title}</Typography>
          </Paper>
        </Grid>
      );
    }
    allGridItems.push(
      <Grid key={uuidv4()} item container>
        <Grid className="border-blue" item xs={1}>
          <Paper elevation={2} align="center">
            <Typography variant="overline">{hours[i]}</Typography>
          </Paper>
        </Grid>
        {itemsToRender}
        <Grid className="border-blue" item xs></Grid>
      </Grid>
    );
  } //end for

  return (
    <Grid container spacing={1} className="four-parts-day paper-padding">
      {allGridItems}
    </Grid>
  );
};
