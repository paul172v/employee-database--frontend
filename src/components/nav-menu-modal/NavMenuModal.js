import React, { useContext } from "react";

import { BsFillPeopleFill } from "react-icons/bs";
import { BiNews } from "react-icons/bi";

import classes from "./NavMenuModal.module.scss";

import NavCard from "./NavCard/NavCard";

import PageContext from "../../context/page-context";

const NavMenuModal = (props) => {
  const pageCtx = useContext(PageContext);

  const toggleModalHandler = () => {
    props.onToggleModal();
  };

  return (
    <React.Fragment>
      <div className={classes.background} />
      <div className={classes.page} onClick={toggleModalHandler}>
        <NavCard
          icon={<BiNews />}
          label="Announcements"
          function={pageCtx.goToAnnouncementsHandler}
        />

        <NavCard
          icon={<BsFillPeopleFill />}
          label="Employees"
          function={pageCtx.goToEmployeesHandler}
        />
      </div>
    </React.Fragment>
  );
};

export default NavMenuModal;
