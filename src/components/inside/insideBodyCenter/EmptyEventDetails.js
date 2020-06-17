import React from "react";

//Material-ui stuff
import Grid from "@material-ui/core/Grid";

//It is rendered when the user don't want to see the details of any meeting
export const EmptyEventDetails = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="empty-event-details">
        
      </Grid>
    </Grid>
  );
};
