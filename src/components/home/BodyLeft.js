import React from "react";
import { Morning } from "./Morning";
import { Night } from "./Night";

// Material UI
import Grid from "@material-ui/core/Grid";

export const BodyLeft = () => {
  return (
    <Grid container>
    <Grid container spacing={0}  className="border">
      <Grid  item xs={12} >
        <Night />
      </Grid>
    </Grid>

    <Grid container spacing={0}  className="spacing-six border">
      <Grid item xs={12}  >
        <Morning /> 
      </Grid>
    </Grid>
    </Grid>
  );
};
