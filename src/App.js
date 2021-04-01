import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";

//Components
import { HomePage } from "./components/general/HomePage";
import { TopNavbar } from "./components/navbar/TopNavbar";
import {GeneralContext} from "./components/context/generalContext";

//Pages
import { Signup } from "./components/pages/Signup";
import { Login } from "./components/pages/Login";

//Material UI stuff
import Paper from "@material-ui/core/Paper";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";





export const App = () => {
  //has the value of dark or light
  const {darkLight} = useContext(GeneralContext);

  const theme = createMuiTheme({
    palette: {
      type: darkLight,
      primary: {
        main: "#40c4ff",
      }
    },
  });

  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.clear();
      window.location.href = "/";
    } else if (window.location.href !== "https://roditor-agenda.netlify.app/agenda") {// else if (window.location.href !== "http://localhost:3000/agenda")
      //if i don't specify the condition above, continuing reloading is happening
      window.location.href = "/agenda";
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Router>
          <TopNavbar />
          <div className="container1">
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/agenda" component={HomePage} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </Paper>
    </ThemeProvider>
  );
};
