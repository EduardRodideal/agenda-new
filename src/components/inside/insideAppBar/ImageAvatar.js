import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { GeneralContext } from "../../context/generalContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

//the image of the user on the Navbar
export const ImageAvatar = () => {
  const classes = useStyles();

  //state for imageUrl and username from database
  const {setUsername, setImageUrl } = useContext(
    GeneralContext
  );

  //fetching the imageUrl and username form database
  useEffect(() => {
    //this url solves the cross origin problem
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //get authentication token from localStorage
    const token = localStorage.FBIdToken;
    //headers for GET request
    const config = {
      headers: {
        Authorization: token,
      },
    };

    //gets the image of the user from localeStorage if exists
    const avatar = localStorage.avatar;

    if (!avatar) {
    axios
      .get(
        proxyurl +
          "https://europe-west3-agenda-idealante.cloudfunctions.net/api/user/details",
        config
      )
      .then((res) => {
        //get the username of the user from the database
        setUsername(res.data.details.username);
        
        localStorage.setItem("username", res.data.details.username);
        localStorage.setItem("avatar", res.data.details.imageUrl);
        //get the image of the user from the localStorage
        setImageUrl(localStorage.avatar);

      })
      .catch((err) => {
        console.error(err);
      });
       }
  }, [setImageUrl, setUsername]);

  return (
    <div className={classes.root}>
      {/* <Avatar alt="Idealante" src={imageUrl} /> */}
      <Avatar alt="Idealante" src={localStorage.avatar} />
    </div>
  );
};
