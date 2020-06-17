import React from "react";
import {HomeBtn} from "./HomeBtn";
import {LoginBtn} from "./LoginBtn"
import {LogoutBtn} from "./LogoutBtn";
import {SignupBtn} from "./SignupBtn";

//Material-ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

//this is the navbar of the home page
export const TopNavbar = () => {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        <LoginBtn />
        <HomeBtn />
        <SignupBtn />
        <LogoutBtn />
      </Toolbar>
    </AppBar>
  );
};