import React, {useEffect, useContext} from "react";
import { BodyLeft } from "../home/BodyLeft";
import { BodyCenter } from "../home/BodyCenter";
import { BodyRight } from "../home/BodyRight";
import {WriteContext} from "../context/writeContext";

import { firebase } from "../../firebase";
import jwtDecode from "jwt-decode";

// Material UI
import Grid from "@material-ui/core/Grid";

export const Body = () => {
const {setItems} = useContext(WriteContext);

//sets firebase listener and fetches the items form the datebase
useEffect(() => {
  const token = localStorage.FBIdToken;
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user_id;

  //returns a method that will close the connection with the datebase
  const unsubscribe = firebase
    .firestore()
    .collection("items")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const newItems = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setItems(newItems);
      console.log(newItems, "this is on shapshot")
      //console.log(snapshot, "this is the snapshot");
    });
    //this return will be executed when the component will unmount
    //returns a cleanup function that mimics componentWillUnmount
    return unsubscribe;
},[setItems]);
  return (
    <Grid container spacing={2} className="border1">
      <Grid container item xs={4}  >
        <BodyLeft />
      </Grid>

      <Grid item xs={4}>
        <BodyCenter />
      </Grid>

      <Grid container item xs={4}>
        <BodyRight />
      </Grid>
    </Grid>
  );
};
