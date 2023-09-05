import React, { useState } from "react";
import ReactDOM from "react-dom";

import classes from "./PageBoilerplate.module.scss";

import Header from "../../components/header/Header";
import ManageAccountModal from "../manage-account-modal/ManageAccountModal";
import NavMenuModal from "../nav-menu-modal/NavMenuModal";

const PageBoilerplate = (props) => {
  const [modalActive, setModalActive] = useState(false);
  const [modalPage, setModalPage] = useState("manageAccount");

  const toggleModalHandler = () => {
    modalActive === true && setModalActive(false);
    modalActive === false && setModalActive(true);
  };

  const setModalPageToManageAccountHandler = () => {
    setModalPage("manageAccount");
  };

  const setModalPageToNavMenuHandler = () => {
    setModalPage("navMenu");
  };

  const goToErrorTemplateHandler = () => {
    props.onGoToErrorTemplate();
  };

  const changeErrorStateHandler = (status, message, goTo) => {
    props.onChangeErrorState(status, message, goTo);
  };

  return (
    <div className={classes.window}>
      <Header
        onToggleModal={toggleModalHandler}
        onSetModalPageToManageAccount={setModalPageToManageAccountHandler}
        onSetModalPageToNavMenu={setModalPageToNavMenuHandler}
      />
      {modalActive === true &&
        modalPage === "manageAccount" &&
        ReactDOM.createPortal(
          <ManageAccountModal
            onToggleModal={toggleModalHandler}
            onGoToErrorTemplate={goToErrorTemplateHandler}
            onChangeErrorState={changeErrorStateHandler}
          />,
          document.getElementById("modal-root")
        )}
      {modalActive === true &&
        modalPage === "navMenu" &&
        ReactDOM.createPortal(
          <NavMenuModal
            onToggleModal={toggleModalHandler}
            onGoToErrorTemplate={goToErrorTemplateHandler}
            onChangeErrorState={changeErrorStateHandler}
          />,
          document.getElementById("modal-root")
        )}
      <div className={classes.page}>{props.children}</div>
    </div>
  );
};

export default PageBoilerplate;
