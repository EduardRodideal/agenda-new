import React, { useContext } from "react";
import {GeneralContext} from "../context/generalContext";

import axios from "axios";

//Material Ui
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";

export const UploadImage = (props) => {
 
  //this address is used in order to solve the cross origin problem
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  //create the url where to send the request
  const url =
    proxyurl +
    "https://europe-west3-agenda-idealante.cloudfunctions.net/api/user/image";

  //authentication token
  const token = localStorage.FBIdToken;
  //headers for POST request if we have protected route
  const config = {
    headers: {
      Authorization: token,
    },
  };

  //state for imageUrl and username from database
  const {setUsername, setImageUrl } = useContext(
    GeneralContext
  );

  const loadNewImage = () => {
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

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    axios.post(url, formData, config).then((res) => {
      console.log(res);
      loadNewImage();
    });
  };

  //i vazut this in a video https://www.youtube.com/watch?v=XeiOnkEI7XI
  //asta este in loc de
  //const fileInput = document.getElementById("ImageInput");
  //fileInput.click();
  let refFileInput;

  return (
    <div>
      <input
        type="file"
        id="ImageInput"
        hidden="hidden"
        onChange={handleImageChange}
        ref={(fileInput) => (refFileInput = fileInput)}
      />
      {/* {this tooltip causes an error, i must change it} */}
      <Tooltip title="Edit profile picture" placement="top">
        <IconButton onClick={() => refFileInput.click()} className="l">
          <EditIcon className="white-color" />
        </IconButton>
      </Tooltip>
    </div>
  );
};
