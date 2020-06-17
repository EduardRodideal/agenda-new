import React from "react";
import { Evening } from "./Evening";
import { Afternoon } from "./Afternoon";

// Material UI
import Grid from "@material-ui/core/Grid";

export const BodyRight = () => {
  return (
    <Grid container>
    <Grid container spacing={0}  className="border">
      <Grid  item xs={12} >
        <Afternoon />
      </Grid>
    </Grid>

    <Grid container spacing={0}  className="spacing-six border">
      <Grid item xs={12}  >
        <Evening/> 
      </Grid>
    </Grid>
    </Grid>
  );
};
