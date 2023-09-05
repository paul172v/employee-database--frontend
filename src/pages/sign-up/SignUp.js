import React, { useState, useRef, useContext } from "react";

import classes from "./SignUp.module.scss";

import ButtonClose from "../../components/button-close/ButtonClose";

import pageContext from "../../context/page-context";
import errorContext from "../../context/error-context";

const SignUp = () => {
  const [formErrorMessage, setFormErrorMessage] = useState(false);
  const [errorMessageContent, setErrorMessageContent] = useState("");

  const pageCtx = useContext(pageContext);
  const errorCtx = useContext(errorContext);

  const goToAnnouncementsHandler = () => {
    pageCtx.goToAnnouncementsHandler();
  };

  const goToErrorTemplateHandler = () => {
    pageCtx.goToErrorTemplateHandler();
  };

  const goToStartMenuHandler = () => {
    pageCtx.goToStartMenuHandler();
  };

  const changeErrorStateHandler = (status, message, goTo) => {
    errorCtx.changeErrorStateHandler(status, message, goTo);
  };

  const curEmail = useRef();
  const curPassword = useRef();
  const curPasswordConfirm = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = curEmail.current.value;
    const password = curPassword.current.value;
    const passwordConfirm = curPasswordConfirm.current.value;

    if (!email || !password || !passwordConfirm) {
      setErrorMessageContent("All fields must be completed.");
      setFormErrorMessage(true);
    }

    if (password !== passwordConfirm) {
      setErrorMessageContent("Password and Password Confirm do not match.");
      setFormErrorMessage(true);
    }

    if (email && password && passwordConfirm && password === passwordConfirm) {
      await fetch("http://127.0.0.1:5000/api/v1/users/signup", {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          passwordChangedAt: Date.now(),
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
              data.state,
              data.message,
              goToStartMenuHandler
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
        <h1>Sign Up</h1>
        <ButtonClose label="X" function={goToStartMenuHandler} />
      </div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email" id="emailLabel">
          Email Address
        </label>
        <input htmlFor="email" type="email" defaultValue="" ref={curEmail} />

        <label htmlFor="password" id="passwordLabel">
          Password
        </label>
        <input
          htmlFor="password"
          type="password"
          defaultValue=""
          ref={curPassword}
        />

        <label htmlFor="passwordConfirm" id="passwordConfirmLabel">
          Password Confirm
        </label>
        <input
          htmlFor="passwordConfirm"
          type="password"
          defaultValue=""
          ref={curPasswordConfirm}
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

export default SignUp;
