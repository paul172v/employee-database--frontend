import React from "react";

import classes from "./ButtonClose.module.scss";

const ButtonClose = (props) => {
  return (
    <button className={classes["button"]} onClick={props.function}>
      {props.label}
    </button>
  );
};

export default ButtonClose;
