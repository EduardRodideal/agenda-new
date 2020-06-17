import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TimeContext } from "../context/timeContext";
import { CurrentTimeContext } from "../context/currentTimeContext";
import { RenderContext } from "../context/renderContext";

//Material UI
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
    backgroundColor: "#40c4ff",
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

export const TableYears = () => {
  const classes = useStyles();

  //this time is changed by the user actions
  const { time, setTime } = useContext(TimeContext);

  //a moment object that contains the current time
  const { currentTime } = useContext(CurrentTimeContext);

  //when setMonth(true) it renders the days of the month
  //when setYears(true) it renders 12 years
  const { setMonth, setYears } = useContext(RenderContext);

  //making a clone of moment object
  const timeClone = time.clone();

  //changes the year when the user click on a year
  const handleClick = (year) => {
    timeClone.year(year);//changing the year of the moment clone
    setTime(timeClone);//setting the time with the clone value
    setMonth(true);//rendering the days of the month
    setYears(false);//hiding the years
  };

  //holds one row of the table
  const tableRows = [];
  //holds all the data of a row
  let tableData = [];
  //the first year from 12 years
  let firstYear = currentTime.year();

  //creating the table for 12 years
  for (let i = 1; i < 13; i++) {
    //create cells for a row
    tableData.push(
      <StyledTableCell
        onClick={() => handleClick(firstYear + i - 1)}
        key={uuidv4()}
        align="center"
      >
        {firstYear + i - 1}
      </StyledTableCell>
    );
    if (i % 4 === 0) {
      //create rows for the table
      tableRows.push(<TableRow key={uuidv4()}>{tableData}</TableRow>);
      tableData = [];
    }
  }

  return (
    //the table with 12 years
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
};
