import React, { useState, useRef, useContext } from "react";

import classes from "./UseResetToken.module.scss";

import ButtonStandard from "../../components/button-standard/ButtonStandard";
import ButtonClose from "../../components/button-close/ButtonClose";

import pageContext from "../../context/page-context";

const UseResetToken = () => {
  const [formErrorMessage, setFormErrorMessage] = useState(false);
  const [errorMessageContent, setErrorMessageContent] = useState("");

  const pageCtx = useContext(pageContext);

  const curToken = useRef();
  const newPassword = useRef();
  const newPasswordConfirm = useRef();

  const goToStartMenuHandler = () => {
    pageCtx.onGoToStartMenu();
  };

  const goToMainPageHandler = () => {
    pageCtx.onGoToMainPage();
  };

  const goToErrorTemplateHandler = () => {
    pageCtx.onGoToErrorTemplate();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = curToken.current.value;
    const password = newPassword.current.value;
    const passwordConfirm = newPasswordConfirm.current.value;

    if (!token || !password || !passwordConfirm) {
      setErrorMessageContent("All fields must be completed.");
      setFormErrorMessage(true);
    }

    if (password !== passwordConfirm) {
      setErrorMessageContent(
        "New Password and New Password Confirm do not match."
      );
      setFormErrorMessage(true);
    }

    if (token && password) {
      await fetch("http://127.0.0.1:5000/api/v1/users/reset-password", {
        method: "PATCH",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          /* created a cookie with the jwt token. SameSite=none and secure=true are necessary */
          if (data.status === "success") {
            goToMainPageHandler();
          }

          if (data.status !== "success") {
            goToErrorTemplateHandler();
          }
        });
    }
  };

  return (
    <div className={classes.card}>
      <div className="u-row-3">
        <div></div>
        <h1>Use Reset Token</h1>
        <ButtonClose label="X" function={goToStartMenuHandler} />
      </div>
      <p className={classes["info-text"]}>
        An email has been sent to your entered email address containing your
        password reset token.
      </p>
      <form className="form-wide" onSubmit={submitHandler}>
        <label htmlFor="token" id="tokenLabel">
          Reset Token
        </label>
        <input htmlFor="token" type="string" defaultValue="" ref={curToken} />
        <label htmlFor="newPassword" id="newPasswordLabel">
          New Password
        </label>
        <input
          htmlFor="newPassword"
          type="password"
          id="newPasswordInput"
          defaultValue=""
          ref={newPassword}
        />
        <label htmlFor="newPasswordConfirm" id="newPasswordConfirmLabel">
          New Password Confirm
        </label>
        <input
          htmlFor="newPasswordConfirm"
          type="password"
          id="newPasswordConfirmInput"
          defaultValue=""
          ref={newPasswordConfirm}
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

export default UseResetToken;
