import React, { useState, useRef, useContext } from "react";

import classes from "./EmailResetToken.module.scss";

import ButtonClose from "../../components/button-close/ButtonClose";

import pageContext from "../../context/page-context";
import errorContext from "../../context/error-context";

const EmailResetToken = () => {
  const [formErrorMessage, setFormErrorMessage] = useState(false);
  const [errorMessageContent, setErrorMessageContent] = useState("");

  const pageCtx = useContext(pageContext);
  const errorCtx = useContext(errorContext);

  const curEmail = useRef();

  const goToLogInHandler = () => {
    pageCtx.onGoToLogInHandler();
  };

  const goToErrorTemplateHandler = () => {
    pageCtx.onGoToErrorTemplateHandler();
  };

  const goToUseResetTokenHandler = () => {
    pageCtx.onGoToUseResetTokenHandler();
  };

  const changeErrorStateHandler = (status, message, goTo) => {
    errorCtx.onChangeErrorStateHandler(status, message, goTo);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = curEmail.current.value;

    if (!email) {
      setErrorMessageContent("All fields must be completed.");
      setFormErrorMessage(true);
    }

    if (email) {
      await fetch("http://127.0.0.1:5000/api/v1/users/forgot-password", {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          /* created a cookie with the jwt token. SameSite=none and secure=true are necessary */
          if (data.status === "success") {
            goToUseResetTokenHandler();
          }

          if (data.status !== "success") {
            changeErrorStateHandler(data.state, data.message, goToLogInHandler);
            goToErrorTemplateHandler();
          }
        });
    }
  };

  return (
    <div className={classes.card}>
      <div className="u-row-3">
        <div></div>
        <h1>Email Reset Token</h1>
        <ButtonClose label="X" function={goToLogInHandler} />
      </div>
      <form className="form" onSubmit={submitHandler}>
        <label htmlFor="email" id="emailLabel">
          Email Address
        </label>
        <input
          htmlFor="email"
          type="email"
          defaultValue="example@example.com"
          ref={curEmail}
        />

        <input type="submit" value="Submit" className="submit-button" />
        <div></div>
        {formErrorMessage && (
          <p className="error-message">{errorMessageContent}</p>
        )}
      </form>
    </div>
  );
};

export default EmailResetToken;
