import React from "react";

import classes from "./ButtonStandard.module.scss";

const ButtonStandard = (props) => {
  return (
    <button className={classes.button} onClick={props.function}>
      {props.label}
    </button>
  );
};

export default ButtonStandard;
