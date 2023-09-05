import React from "react";

import { FiMenu } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";

import classes from "./Header.module.scss";

import ButtonStandard from "../button-standard/ButtonStandard";

const Header = (props) => {
  const turnOnModalManageAccountHandler = () => {
    props.onSetModalPageToManageAccount();
    props.onToggleModal();
  };

  const turnOnModalNavMenuHandler = () => {
    props.onSetModalPageToNavMenu();
    props.onToggleModal();
  };
  return (
    <header className={classes.header}>
      <p className={classes.date}>{Date().slice(4, 15)}</p>
      <h1>172v Employee Database</h1>
      <div className={classes["buttons-wrapper"]}>
        <button
          className={classes["nav-button"]}
          onClick={turnOnModalManageAccountHandler}
        >
          <BsFillPersonFill />
        </button>
        <button
          className={classes["nav-button"]}
          onClick={turnOnModalNavMenuHandler}
        >
          <FiMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;
