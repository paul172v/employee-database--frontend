import React, { useState, useEffect, useContext } from "react";

import classes from "./ViewProfile.module.scss";

import ButtonClose from "../../../components/button-close/ButtonClose";

import EmployeesDataContext from "../../../context/employees-data-context";

const ViewProfile = (props) => {
  const [token, setToken] = useState(undefined);

  const employeesDataCtx = useContext(EmployeesDataContext);

  const toggleAccountModalHandler = () => {
    props.onToggleAccountModal();
  };

  // const goToErrorTemplateHandler = () => {
  //   props.onGoToErrorTemplate();
  // };

  // const changeErrorStateHandler = (status, message, goTo) => {
  //   props.onChangeErrorState(status, message, goTo);
  // };

  const cookies = document.cookie.split(";");

  useEffect(() => {
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].startsWith("jwt=Bearer")) {
        setToken(cookies[i]);
      }
    }
  }, [token]);

  if (token !== undefined && employeesDataCtx.reloadUser === true) {
    employeesDataCtx.getUserFromToken(token);
    employeesDataCtx.turnOffReloadUserHandler();
  }

  let birthDay, birthMonth, birthYear;

  if (employeesDataCtx.currentUserState !== null) {
    birthDay = employeesDataCtx.currentUserState.DOB.slice(3, 5);
    birthMonth = employeesDataCtx.currentUserState.DOB.slice(0, 2);
    birthYear = employeesDataCtx.currentUserState.DOB.slice(6, 10);

    if (birthMonth === "01") birthMonth = "Jan";
    if (birthMonth === "02") birthMonth = "Feb";
    if (birthMonth === "03") birthMonth = "Mar";
    if (birthMonth === "04") birthMonth = "Apr";
    if (birthMonth === "05") birthMonth = "May";
    if (birthMonth === "06") birthMonth = "Jun";
    if (birthMonth === "07") birthMonth = "Jul";
    if (birthMonth === "08") birthMonth = "Aug";
    if (birthMonth === "09") birthMonth = "Sep";
    if (birthMonth === "10") birthMonth = "Oct";
    if (birthMonth === "11") birthMonth = "Nov";
    if (birthMonth === "12") birthMonth = "Dec";
  }

  return (
    <div className={classes.card}>
      <div className="u-row-3">
        <div></div>
        <h1>User Profile</h1>
        <ButtonClose label="X" function={toggleAccountModalHandler} />
      </div>
      {employeesDataCtx.currentUserState && (
        <div className={classes["three-columns-wrapper"]}>
          <div className={classes.column}>
            <div>
              {employeesDataCtx.reloadUser === false && (
                <img
                  className={classes.photo}
                  src={
                    employeesDataCtx.currentUserState.photo !== null
                      ? `http://localhost:5000/public/img/user-photos/${employeesDataCtx.currentUserState.photo}`
                      : "/img/user-photos/default.jpg"
                  }
                  alt={`${employeesDataCtx.currentUserState.firstName} ${employeesDataCtx.currentUserState.lastName} ${employeesDataCtx.photoCounter}`}
                />
              )}
            </div>
          </div>
          <div className={classes.column}>
            <h2 className={classes.h2}>Personal Information</h2>
            <div className={classes.row}>
              <h3>Name:</h3>
              <p>{`${employeesDataCtx.currentUserState.firstName} ${employeesDataCtx.currentUserState.lastName}`}</p>
            </div>
            <div className={classes.row}>
              <h3>Gender:</h3>
              <p>{`${employeesDataCtx.currentUserState.gender || "N/A"}`}</p>
            </div>
            <div className={classes.row}>
              <h3>Date of Birth:</h3>
              <p>
                {employeesDataCtx.currentUserState.DOB
                  ? `${birthMonth} ${birthDay} ${birthYear}`
                  : "N/A"}
              </p>
            </div>
            <div className={classes.row}>
              <h3>Street Address:</h3>
              <p>{employeesDataCtx.currentUserState.streetAddress || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>City/Town:</h3>
              <p>{employeesDataCtx.currentUserState.cityTown || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Postcode:</h3>
              <p>{employeesDataCtx.currentUserState.postcode || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Nationality:</h3>
              <p>{employeesDataCtx.currentUserState.nationality || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Phone Number:</h3>
              <p>{employeesDataCtx.currentUserState.phone || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Email Address:</h3>
              <p>{employeesDataCtx.currentUserState.email}</p>
            </div>
            <div className="u-gap" />
            <h2 className={classes.h2}>Additional Information</h2>
            <div className={classes.row}>
              <h3>NI Number:</h3>
              <p>{employeesDataCtx.currentUserState.NINumber || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Share Code:</h3>
              <p>{employeesDataCtx.currentUserState.shareCode || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Visa:</h3>
              <p>{employeesDataCtx.currentUserState.visa || "N/A"}</p>
            </div>
            <div className="u-gap" />
            <h2>Next of Kin</h2>
            <div className={classes.row}>
              <h3>Name:</h3>
              <p>{employeesDataCtx.currentUserState.NoKName || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Relation:</h3>
              <p>{employeesDataCtx.currentUserState.NoKRelation || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Phone Number:</h3>
              <p>{employeesDataCtx.currentUserState.NoKPhone || "N/A"}</p>
            </div>
          </div>
          <div className={classes.column}>
            <h2>Work Information</h2>
            <div className={classes.row}>
              <h3>Start Date:</h3>
              <p>{employeesDataCtx.currentUserState.startDate || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Position:</h3>
              <p>{employeesDataCtx.currentUserState.position || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Department:</h3>
              <p>{employeesDataCtx.currentUserState.department || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Contract Type:</h3>
              <p>{employeesDataCtx.currentUserState.contractType || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Rate per hour:</h3>
              <p>{employeesDataCtx.currentUserState.ratePerHour || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Avg Weekly Hours:</h3>
              <p>{employeesDataCtx.currentUserState.avgWeeklyHours || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>End Date:</h3>
              <p>{employeesDataCtx.currentUserState.endDate || "N/A"}</p>
            </div>
            <div className="u-gap" />
            <h2>Bank Details</h2>
            <div className={classes.row}>
              <h3>Bank Name:</h3>
              <p>{employeesDataCtx.currentUserState.bankName || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Sort Code:</h3>
              <p>{employeesDataCtx.currentUserState.sortCode || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Account Number:</h3>
              <p>{employeesDataCtx.currentUserState.accountNumber || "N/A"}</p>
            </div>
            <div className={classes.row}>
              <h3>Name on Account:</h3>
              <p>{employeesDataCtx.currentUserState.nameOnAccount || "N/A"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
