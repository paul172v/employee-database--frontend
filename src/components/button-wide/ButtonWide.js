import React from "react";

import classes from "./ButtonWide.module.scss";

const ButtonWide = (props) => {
  return (
    <button className={classes.button} onClick={props.function}>
      {props.label}
    </button>
  );
};

export default ButtonWide;
