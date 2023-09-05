import React, { useState, useRef, useContext } from "react";

import classes from "./LogIn.module.scss";

import ButtonStandard from "../../components/button-standard/ButtonStandard";
import ButtonClose from "../../components/button-close/ButtonClose";

import pageContext from "../../context/page-context";
import errorContext from "../../context/error-context";

const LogIn = (props) => {
  const [formErrorMessage, setFormErrorMessage] = useState(false);
  const [errorMessageContent, setErrorMessageContent] = useState("");

  const pageCtx = useContext(pageContext);
  const errorCtx = useContext(errorContext);

  const curEmail = useRef();
  const curPassword = useRef();

  const goToAnnouncementsHandler = () => {
    pageCtx.goToAnnouncementsHandler();
  };

  const goToErrorTemplateHandler = () => {
    pageCtx.goToErrorTemplateHandler();
  };

  const goToStartMenuHandler = () => {
    pageCtx.goToStartMenuHandler();
  };

  const goToEmailResetTokenHandler = () => {
    pageCtx.goToEmailResetTokenHandler();
  };

  const goToLogInHandler = () => {
    pageCtx.goToLogInHandler();
  };

  const changeErrorStateHandler = (status, message, goTo) => {
    errorCtx.changeErrorStateHandler(status, message, goTo);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = curEmail.current.value;
    const password = curPassword.current.value;

    if (!email || !password) {
      setErrorMessageContent("All fields must be completed.");
      setFormErrorMessage(true);
    }

    if (email && password) {
      await fetch("http://127.0.0.1:5000/api/v1/users/login", {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          /* created a cookie with the jwt token. SameSite=none and secure=true are necessary */
          if (data.status === "success") {
            document.cookie = `jwt=Bearer ${data.token}; SameSite=none; secure=true`;
            goToAnnouncementsHandler();
          }

          if (data.status !== "success") {
            document.cookie = `jwt=null`;
            changeErrorStateHandler(
              data.status,
              data.message,
              goToLogInHandler
            );
            goToErrorTemplateHandler();
          }
        });
    }
  };

  return (
    <div className={classes.card}>
      <div className="u-row-3">
        <div></div>
        <h1>Log In</h1>
        <ButtonClose label="X" function={goToStartMenuHandler} />
      </div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email" id="emailLabel">
          Email Address
        </label>
        <input
          htmlFor="email"
          type="email"
          defaultValue="example@example.com"
          ref={curEmail}
        />

        <label htmlFor="password" id="passwordLabel">
          Password
        </label>
        <input
          htmlFor="password"
          type="password"
          defaultValue="aaa"
          ref={curPassword}
        />

        <input type="submit" value="Submit" className="submit-button" />
        <ButtonStandard
          label="Forgot Password"
          function={goToEmailResetTokenHandler}
        />
        <div></div>
        {formErrorMessage && (
          <p className="error-message">{errorMessageContent}</p>
        )}
      </form>
    </div>
  );
};

export default LogIn;
