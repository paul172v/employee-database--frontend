import React, { useState, useContext } from "react";

import classes from "./ManageAccountModal.module.scss";

import ManageAccountMenu from "./manage-account-menu/ManageAccountMenu";
import ChangePassword from "./change-password/ChangePassword";
import ViewProfile from "./view-profile/ViewProfile";
import EditProfile from "./edit-profile/EditProfile";

import PageContext from "../../context/page-context";
import ErrorContext from "../../context/error-context";

const ManageAccountModal = (props) => {
  const pageContext = useContext(PageContext);
  const errorContext = useContext(ErrorContext);

  const [manageAccountPageState, setManageAccountPageState] =
    useState("manageAccountMenu");

  const toggleAccountModalHandler = () => {
    props.onToggleModal();
  };

  const goToViewProfileHandler = () => {
    setManageAccountPageState("viewProfile");
  };

  const goToChangePasswordHandler = () => {
    setManageAccountPageState("changePassword");
  };

  const goToEditProfileHandler = () => {
    setManageAccountPageState("editProfile");
  };

  const goToErrorTemplateHandler = () => {
    pageContext.goToErrorTemplateHandler();
  };
  const changeErrorStateHandler = (status, message, goTo) => {
    errorContext.changeErrorStateHandler(status, message, goTo);
  };

  return (
    <React.Fragment>
      <div className={classes.background} onClick={toggleAccountModalHandler} />
      {manageAccountPageState === "manageAccountMenu" && (
        <ManageAccountMenu
          onToggleAccountModal={toggleAccountModalHandler}
          onGoToChangePassword={goToChangePasswordHandler}
          onGoToViewProfile={goToViewProfileHandler}
          onGoToEditProfile={goToEditProfileHandler}
        />
      )}
      {manageAccountPageState === "changePassword" && (
        <ChangePassword
          onToggleAccountModal={toggleAccountModalHandler}
          onGoToErrorTemplate={goToErrorTemplateHandler}
          onChangeErrorState={changeErrorStateHandler}
        />
      )}
      {manageAccountPageState === "viewProfile" && (
        <ViewProfile
          onToggleAccountModal={toggleAccountModalHandler}
          onGoToErrorTemplate={goToErrorTemplateHandler}
          onChangeErrorState={changeErrorStateHandler}
        />
      )}
      {manageAccountPageState === "editProfile" && (
        <EditProfile
          onToggleAccountModal={toggleAccountModalHandler}
          onGoToErrorTemplate={goToErrorTemplateHandler}
          onChangeErrorState={changeErrorStateHandler}
        />
      )}
    </React.Fragment>
  );
};

export default ManageAccountModal;
