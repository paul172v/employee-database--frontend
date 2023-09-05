import React from "react";

import classes from "./NavCard.module.scss";

import ButtonStandard from "../../button-standard/ButtonStandard";

const NavCard = (props) => {
  return (
    <div className={classes["nav-card"]}>
      <i className={classes.icon}>{props.icon}</i>
      <ButtonStandard label={props.label} function={props.function} />
    </div>
  );
};
export default NavCard;
