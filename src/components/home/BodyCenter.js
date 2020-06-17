import React, { useContext } from "react";
import { RenderContext } from "../context/renderContext";
import { Calendar } from "./Calendar";
import { EmptyEventDetails } from "../inside/insideBodyCenter/EmptyEventDetails";
import { EventDetails } from "../inside/insideBodyCenter/EventDetails";
// Material UI
import Grid from "@material-ui/core/Grid";
import { TableMonths } from "./TableMonths";
import { TableYears } from "./TableYears";

export const BodyCenter = () => {
  //3 boolean values if they are true we render the month
  //the months of the year and 12 years respectively
  const { month, months, years, empty } = useContext(RenderContext);
  return (
    <div>
      <Grid container spacing={0} className="border">
        <Grid item xs={12}>
          {month && <Calendar />}
          {months && <TableMonths />}
          {years && <TableYears />}
        </Grid>
      </Grid>

      <Grid container spacing={0} className="spacing-six border">
        <Grid item xs={12}>
          {empty && <EmptyEventDetails />}
          {!empty && <EventDetails />}
        </Grid>
      </Grid>
    </div>
  );
};
