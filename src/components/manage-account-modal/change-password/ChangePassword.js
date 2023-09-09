import React, { useState, useRef, useEffect } from "react";

import classes from "./ChangePassword.module.scss";

import ButtonStandard from "../../../components/button-standard/ButtonStandard";
import ButtonClose from "../../../components/button-close/ButtonClose";

const ChangePassword = (props) => {
  const [token, setToken] = useState(undefined);

  const curPasswordInput = useRef();
  const newPasswordInput = useRef();
  const newPasswordConfirmInput = useRef();

  const toggleAccountModalHandler = () => {
    props.onToggleAccountModal();
  };

  const goToErrorTemplateHandler = () => {
    props.onGoToErrorTemplate();
  };

  const changeErrorStateHandler = (status, message, goTo) => {
    props.onChangeErrorState(status, message, goTo);
  };

  const cookies = document.cookie.split(";");

  useEffect(() => {
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].startsWith("jwt=Bearer")) {
        setToken(cookies[i]);
      }
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const curPassword = curPasswordInput.current.value;
    const newPassword = newPasswordInput.current.value;
    const newPasswordConfirm = newPasswordConfirmInput.current.value;

    if (
      curPassword &&
      newPassword.length > 0 &&
      newPassword === newPasswordConfirm
    ) {
      await fetch(
        "https://test172v-b8264eda63d9.herokuapp.com/api/v1/users/change-password",
        {
          method: "PATCH",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            curPassword: curPassword,
            newPassword: newPassword,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          /* created a cookie with the jwt token. SameSite=none and secure=true are necessary */
          if (data.status === "success") {
            toggleAccountModalHandler();
          }

          if (data.status !== "success") {
            changeErrorStateHandler(
              data.status,
              data.message,
              toggleAccountModalHandler()
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
        <h1>Change Password</h1>
        <ButtonClose label="X" function={toggleAccountModalHandler} />
      </div>
      <form className="form-wide" onSubmit={submitHandler}>
        <label htmlFor="curPassword" id="curPasswordLabel">
          Current Password
        </label>
        <input
          htmlFor="curPassword"
          type="password"
          defaultValue=""
          ref={curPasswordInput}
        />

        <label htmlFor="password" id="newPasswordLabel">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          defaultValue=""
          ref={newPasswordInput}
        />

        <label htmlFor="newPasswordConfirm" id="newPasswordConfirmLabel">
          New Password Confirm
        </label>
        <input
          id="newPasswordConfirm"
          type="password"
          defaultValue=""
          ref={newPasswordConfirmInput}
        />
        <input type="submit" value="Submit" className={classes.button} />
      </form>
    </div>
  );
};

export default ChangePassword;
