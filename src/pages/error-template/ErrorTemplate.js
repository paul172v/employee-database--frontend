import React, { useContext } from "react";

import classes from "./ErrorTemplate.module.scss";

import ButtonStandard from "../../components/button-standard/ButtonStandard";

import pageContext from "../../context/page-context";
import errorContext from "../../context/error-context";

const ErrorTemplate = () => {
  const pageCtx = useContext(pageContext);
  const errorCtx = useContext(errorContext);

  const goToStartMenuHandler = () => {
    pageCtx.goToStartMenuHandler();
  };

  let status;
  let message;

  errorCtx.errorState.status === "fail"
    ? (status = "Failed")
    : (status = "Error");
  errorCtx.errorState.message.startsWith("E11000")
    ? (message =
        "There is already a user with this email address. Please use a different one or go to the Log In page to reset your password.")
    : (message = errorCtx.errorState.message);

  return (
    <div className={classes.card}>
      <h1 className={classes["error-text"]}>{status}</h1>
      <h2 className={classes["error-text"]}>{message}</h2>
      <div className={classes["u-bottom"]}>
        <ButtonStandard label="Return" function={goToStartMenuHandler} />
      </div>
    </div>
  );
};

export default ErrorTemplate;
