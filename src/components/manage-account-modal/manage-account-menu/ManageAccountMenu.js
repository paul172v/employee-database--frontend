import React, { useContext } from "react";

import classes from "./ManageAccountMenu.module.scss";

import ButtonStandard from "../../button-standard/ButtonStandard";
import ButtonClose from "../../button-close/ButtonClose";

import Context from "../../../context/page-context";

const ManageAccountMenu = (props) => {
  const ctx = useContext(Context);

  const toggleAccountModalHandler = () => {
    props.onToggleAccountModal();
  };

  const logoutHandler = () => {
    document.cookie = `jwt=null; SameSite=none; secure=true`;
    ctx.goToStartMenuHandler();
  };

  const goToViewProfileHandler = () => {
    props.onGoToViewProfile();
  };

  const goToChangePasswordHandler = () => {
    props.onGoToChangePassword();
  };

  const goToEditProfileHandler = () => {
    props.onGoToEditProfile();
  };

  return (
    <React.Fragment>
      <div className={classes.page}>
        <div className={classes["button-wrapper"]}>
          <ButtonStandard
            label="View Profile"
            function={goToViewProfileHandler}
          />
          <ButtonStandard
            label="Edit Profile"
            function={goToEditProfileHandler}
          />
          <ButtonStandard
            label="Change Password"
            function={goToChangePasswordHandler}
          />
          <ButtonStandard label="Log Out" function={logoutHandler} />
        </div>
        <div className={classes["button-close-wrapper"]}>
          <ButtonClose label="X" function={toggleAccountModalHandler} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManageAccountMenu;
