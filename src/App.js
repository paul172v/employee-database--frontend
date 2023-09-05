import React, { useState, useContext } from "react";

import classes from "./App.module.scss";

import StartMenu from "./pages/start-menu/StartMenu";
import SignUp from "./pages/sign-up/SignUp";
import LogIn from "./pages/log-in/LogIn";

import ErrorTemplate from "./pages/error-template/ErrorTemplate";
import Announcements from "./pages/announcements/Announcements";
import EmailResetToken from "./pages/email-reset-token/EmailResetToken";
import UseResetToken from "./pages/use-reset-token/UseResetToken";
import Employees from "./pages/employees/Employees";

import pageContext from "./context/page-context";

function App() {
  const pageCtx = useContext(pageContext);

  return (
    <div className={classes.container}>
      <video
        className={classes.vid}
        src="/vid/background.mp4"
        type="video/mp4"
        autoPlay={true}
        muted={true}
        loop={true}
        preload="auto"
      />
      {pageCtx.state.page === "startMenu" && <StartMenu />}
      {pageCtx.state.page === "signUp" && <SignUp />}
      {pageCtx.state.page === "logIn" && <LogIn />}
      {pageCtx.state.page === "errorTemplate" && <ErrorTemplate />}
      {pageCtx.state.page === "announcements" && <Announcements />}
      {pageCtx.state.page === "emailResetToken" && <EmailResetToken />}
      {pageCtx.state.page === "useResetToken" && <UseResetToken />}
      {pageCtx.state.page === "employees" && <Employees />}
    </div>
  );
}

export default App;
