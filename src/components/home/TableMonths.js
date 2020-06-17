import React, { useContext } from "react";
import { TimeContext } from "../context/timeContext";
import {RenderContext} from "../context/renderContext";
import { v4 as uuidv4 } from "uuid";

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

export const TableMonths = () => {
  const classes = useStyles();

  //this time is changed by the user actions
  const { time, setTime } = useContext(TimeContext);

  //when setMonth(true) it renders the days of the month
  //when setMonths(true) it renders the months of the year
  const {setMonth, setMonths} = useContext(RenderContext);

  //we clone the moment object
  const timeClone = time.clone();

  const handleClick = (month) => {
    //we change the month of the moment object
    timeClone.month(month);
    //updating the time 
    setTime(timeClone);
    //rendering the days of the new month
    setMonth(true);
    //hiding the months of the year
    setMonths(false);
  }

  //the months of the year
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //holds one row of the table
  const tableRows = [];
  //holds all the data of a row
  let tableData = [];

  //create the table of months
  for (let i = 1; i < 13; i++) {
    //create cells for a row
    tableData.push(
      <StyledTableCell onClick={() => handleClick(months[i-1])} key={uuidv4()} align="center">
        {months[i - 1]}
      </StyledTableCell>
    );
    if (i % 4 === 0) {
      //create rows for the table
      tableRows.push(<TableRow key={uuidv4()}>{tableData}</TableRow>);
      tableData = [];
    }
  }

  return (
    //table that contains the months
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
};
