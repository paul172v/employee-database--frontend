import React, { useState, useRef, useEffect, useContext } from "react";

import classes from "./EditProfile.module.scss";

import ButtonStandard from "../../button-standard/ButtonStandard";
import ButtonClose from "../../button-close/ButtonClose";

import employeesDataContext from "../../../context/employees-data-context";

const EditProfile = (props) => {
  const [token, setToken] = useState(undefined);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(undefined);

  const employeesDataCtx = useContext(employeesDataContext);

  const curUploadFile = useRef();

  const toggleAccountModalHandler = () => {
    props.onToggleAccountModal();
  };

  const goToErrorTemplateHandler = () => {
    props.onGoToErrorTemplate();
  };

  const changeErrorStateHandler = (status, message, goTo) => {
    props.onChangeErrorState(status, message, goTo);
  };

  const fileChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const getData = async () => {
    await fetch("http://127.0.0.1:5000/api/v1/users/get-user", {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.payload);
      });
  };

  const cookies = document.cookie.split(";");

  useEffect(() => {
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].startsWith("jwt=Bearer")) {
        setToken(cookies[i]);
      }
    }

    token !== undefined && getData();
  }, [token]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(`${user.firstName}${user.lastName}`, file); // Use the 'file' state here

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/users/update-profile",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: token,
          },
          body: formData, // Pass the 'formData' object here
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.status === "success") {
        toggleAccountModalHandler();
        employeesDataCtx.increasePhotoCounterHandler();
        employeesDataCtx.getUserFromToken();
        employeesDataCtx.fetchAllEmployeesDataHandler();
        employeesDataCtx.getUserFromToken(token);
        employeesDataCtx.fetchAllEmployeesDataHandler(token);
      }

      if (data.status !== "success") {
        changeErrorStateHandler(
          data.status,
          data.message,
          toggleAccountModalHandler()
        );
        goToErrorTemplateHandler();
      }
    } catch (error) {
      console.error("Error:", error);
    }

    console.log(curUploadFile);
  };

  return (
    <div className={classes.card}>
      <div className="u-row-3">
        <div></div>
        <h1>Edit Profile</h1>
        <ButtonClose label="X" function={toggleAccountModalHandler} />
      </div>
      <div className="u-gap"></div>
      <form
        className="form-wide"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <h2 className={classes["form-heading-wide"]}>Profile Picture</h2>
        <label htmlFor="curUploadFile">Upload File</label>
        <input
          ref={curUploadFile}
          name="curUploadFile"
          type="file"
          defaultValue=""
          onChange={fileChangeHandler}
        />
        <h2 className={classes["form-heading-wide"]}>Personal Information</h2>
        <label htmlFor="curFirstName">First Name</label>
        <input type="string" defaultValue="" name="curFirstName" />
        <label htmlFor="curLastName">Last Name</label>
        <input type="string" defaultValue="" name="curLastName" />
        <label htmlFor="curDOB">Date of Birth</label>
        <input type="string" defaultValue="" name="curDOB" />
        <label htmlFor="curStreetAddress">Street Address</label>
        <input type="string" defaultValue="" name="curStreetAddress" />
        <label htmlFor="curCityTown">City/Town</label>
        <input type="string" defaultValue="" name="curCityTown" />
        <label htmlFor="curPostcode">Postcode</label>
        <input type="string" defaultValue="" name="curPostcode" />
        <label htmlFor="curNationality">Nationality</label>
        <input type="string" defaultValue="" name="curNationality" />
        <label htmlFor="curPhone">Phone Number</label>
        <input type="string" defaultValue="" name="curPhone" />
        <label htmlFor="curEmail">Email Address</label>
        <input type="string" defaultValue="" name="curEmail" />

        <h2 className={classes["form-heading-wide"]}>Additional Information</h2>
        <label htmlFor="curNINumber">NI Number</label>
        <input type="string" defaultValue="" name="curNINumber" />
        <label htmlFor="curShareCode">Share Code</label>
        <input type="string" defaultValue="" name="curShareCode" />
        <label htmlFor="curVisa">Visa</label>
        <input type="string" defaultValue="" name="curVisa" />

        <h2 className={classes["form-heading-wide"]}>Next of Kin</h2>
        <label htmlFor="curNOKName">Name</label>
        <input type="string" defaultValue="" name="curNOKName" />
        <label htmlFor="curNOKRelation">Relation</label>
        <input type="string" defaultValue="" name="curNOKRelation" />
        <label htmlFor="curNOKPhone">Phone Number</label>
        <input type="string" defaultValue="" name="curNOKPhone" />

        <h2 className={classes["form-heading-wide"]}>Work Information</h2>
        <label htmlFor="curStartDate">Start Date</label>
        <input type="string" defaultValue="" name="curStartDate" />
        <label htmlFor="curPosition">Position</label>
        <input type="string" defaultValue="" name="curPosition" />
        <label htmlFor="curDepartment">Department</label>
        <input type="string" defaultValue="" name="curDepartment" />
        <label htmlFor="curContractType">Contract Type</label>
        <input type="string" defaultValue="" name="curContractType" />
        <label htmlFor="curRatePerHour">Rate Per Hour</label>
        <input type="string" defaultValue="" name="curRatePerHour" />
        <label htmlFor="curAvgWeeklyHours">Avg Weekly Hours</label>
        <input type="string" defaultValue="" name="curAvgWeeklyHours" />
        <label htmlFor="curEndDate">End Date</label>
        <input type="string" defaultValue="" name="curEndDate" />

        <h2 className={classes["form-heading-wide"]}>Bank Details</h2>
        <label htmlFor="curBankName">Bank Name</label>
        <input type="string" defaultValue="" name="curBankName" />
        <label htmlFor="curSortCode">Sort Code</label>
        <input type="string" defaultValue="" name="curSortCode" />
        <label htmlFor="curAccountNumber">Account Number</label>
        <input type="string" defaultValue="" name="curAccountNumber" />
        <label htmlFor="curNameOnAccount">Name on Account</label>
        <input type="string" defaultValue="" name="curNameOnAccount" />

        <input type="submit" value="Submit" className={classes.button} />
      </form>
    </div>
  );
};

export default EditProfile;
