import React, { useContext } from "react";

import classes from "./StartMenu.module.scss";

import ButtonStandard from "../../components/button-standard/ButtonStandard";

import context from "../../context/page-context";

const StartMenu = (props) => {
  const ctx = useContext(context);

  return (
    <div className={classes.card}>
      <h1>172v Employee Database</h1>
      <div className={classes["u-bottom"]}>
        <ButtonStandard label="Sign Up" function={ctx.goToSignUpHandler} />
        <ButtonStandard label="Log In" function={ctx.goToLogInHandler} />
      </div>
    </div>
  );
};

export default StartMenu;
