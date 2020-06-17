import React, { useContext } from "react";
import { GeneralContext } from "../../context/generalContext";

//Material UI stuff
import Brightness4TwoToneIcon from "@material-ui/icons/Brightness4TwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export const DarkWhiteMode = () => {
  const { darkLight, setDarkLight } = useContext(GeneralContext);

  //switches between dark and light mode
  const handleClick = () => {
    const mode = darkLight === "dark" ? "light" : "dark";
    console.log(mode, "mode in dark");
    setDarkLight(mode);
  };

  return (
    <Tooltip title="Toggle dark/light theme">
      <IconButton onClick={handleClick}  aria-label="toggle theme">
        <Brightness4TwoToneIcon className="white-color"  />
      </IconButton>
    </Tooltip>
  );
};
