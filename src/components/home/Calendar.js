import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TimeContext } from "../context/timeContext";
import { WriteContext } from "../context/writeContext";

//Material UI
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const theme = createMuiTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: "#388e3c",
    },
  },
});

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    backgroundColor: "#40c4ff",
  },
});

export const Calendar = () => {
  const classes = useStyles();

  //represents a momemnt object
  const { time, setTime } = useContext(TimeContext);
  //the context for all the items of an user
  const { items } = useContext(WriteContext);
  //holds all the days that have tasks of the current month
  const daysWithTasks = [];
  //const for calculating the first day of month
  const startTime = time.clone();
  //for calculating last day of month
  const endTime = time.clone();
  //i.e if first day of the month starts on Mon Sun ...
  const dayOfWeekStart = startTime.startOf("month").day();
  //i.e if last day of the month is 30, 31, 28 or 29
  const lastDay = endTime.endOf("month").date();
  //all the rows of the table
  const tableRows = [];
  //all the data of the rows
  let rowData = [];
  let count = 1;
  let sunday = dayOfWeekStart === 0 ? true : false;
  //how many iterations will have in the for loop
  const iterations = sunday ? lastDay + 5 : lastDay;

  //when click on a date we change the date
  const handleClick = (date) => {
    const cloneMoment = time.clone();
    cloneMoment.date(date);
    setTime(cloneMoment);
  };

  //extract all the days that have tasks
  for (let i = 1; i < 32; i++) {
    for (let j = 0; j < items.length; j++) {
      if ("" + time.year() + time.month() + i === items[j].date) {
        daysWithTasks.push(i);
        break;
      }
    }
  }

  //render all the rows in the calendar
  for (let i = 1; i <= iterations; i++) {
    if (sunday) {
      for (let j = 0; j < 6; j++) {
        rowData.push(
          <StyledTableCell
            className={
              i === time.date()
                ? "chosen-date"
                : daysWithTasks.includes(i)
                ? "contains-items"
                : "no-css"
            }
            key={uuidv4()}
          ></StyledTableCell>
        );
      }
      rowData.push(
        <StyledTableCell
          className={
            i === time.date()
              ? "zchosen-date"
              : daysWithTasks.includes(i)
              ? "zcontains-items"
              : "zno-css"
          }
          onClick={() => {
            handleClick(i);
          }}
          key={uuidv4()}
        >
          {i === time.date() ? (
            <Avatar>{i}</Avatar>
          ) : daysWithTasks.includes(i) ? (
            <Badge color="secondary" variant="dot">
              {i}
            </Badge>
          ) : (
            i
          )}
        </StyledTableCell>
      );
      tableRows.push(<TableRow key={uuidv4()}>{rowData}</TableRow>);
      rowData = [];
      sunday = false;
      count = 0;
      continue;
    }

    if (count < dayOfWeekStart) {
      count++;
      i = 0;
      rowData.push(
        <StyledTableCell
          className={
            i === time.date()
              ? "chosen-date"
              : daysWithTasks.includes(i)
              ? "contains-items"
              : "no-css"
          }
          key={uuidv4()}
        ></StyledTableCell>
      );
      continue;
    }
    if (i <= lastDay) {
      rowData.push(
        <StyledTableCell
          className={
            i === time.date()
              ? "dchosen-date"
              : daysWithTasks.includes(i)
              ? "dcontains-items"
              : "dno-css"
          }
          onClick={() => {
            handleClick(i);
          }}
          key={uuidv4()}
        >
          {i === time.date() ? (
            <Avatar className="chosen-date">{i}</Avatar>
          ) : daysWithTasks.includes(i) ? (
            <Badge color="secondary" variant="dot">
              {i}
            </Badge>
          ) : (
            i
          )}
        </StyledTableCell>
      );
    } else {
      rowData.push(
        <StyledTableCell
          className={
            i === time.date()
              ? "chosen-date"
              : daysWithTasks.includes(i)
              ? "contains-items"
              : "no-css"
          }
          key={uuidv4()}
        ></StyledTableCell>
      );
    }
    if ((i + count - 1) % 7 === 0 || i === iterations) {
      tableRows.push(<TableRow key={uuidv4()}>{rowData}</TableRow>);
      rowData = [];
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Mon</StyledTableCell>
                <StyledTableCell align="center">Tue</StyledTableCell>
                <StyledTableCell align="center">Wed</StyledTableCell>
                <StyledTableCell align="center">Thu</StyledTableCell>
                <StyledTableCell align="center">Fri</StyledTableCell>
                <StyledTableCell align="center">Sat</StyledTableCell>
                <StyledTableCell align="center">Sun</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ThemeProvider>
  );
};
