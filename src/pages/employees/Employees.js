import React, { useState, useEffect, useRef, useContext } from "react";

import classes from "./Employees.module.scss";

import PageBoilerplate from "../../components/page-boilerplate/PageBoilerplate";
import ButtonStandard from "../../components/button-standard/ButtonStandard";
import ButtonWide from "../../components/button-wide/ButtonWide";
import EmployeeCard from "../../components/employee-card/EmployeeCard";

import employeesDataContext from "../../context/employees-data-context";

const Employees = (props) => {
  const [token, setToken] = useState(undefined);

  const [selectOption, setSelectOption] = useState("firstName");

  const employeesDataCtx = useContext(employeesDataContext);

  const findRef = useRef();

  const viewAllUsersHandler = () => {
    employeesDataCtx.fetchAllEmployeesDataHandler(token);
  };

  const sortLastNameAtoZHandler = () => {
    employeesDataCtx.sortLastNameAtoZHandler(token);
  };

  const sortLastNameZtoAHandler = () => {
    employeesDataCtx.sortLastNameZtoAHandler(token);
  };

  const sortPositionAtoZHandler = () => {
    employeesDataCtx.sortPositionAtoZHandler(token);
  };

  const sortPositionZtoAHandler = () => {
    employeesDataCtx.sortPositionZtoAHandler(token);
  };

  const sortDepartmentAtoZHandler = () => {
    employeesDataCtx.sortDepartmentAtoZHandler(token);
  };

  const sortDepartmentZtoAHandler = () => {
    employeesDataCtx.sortDepartmentZtoAHandler(token);
  };

  const searchFilterHandler = (e) => {
    e.preventDefault();

    const criteria = selectOption;
    const targetWord = findRef.current.value;

    employeesDataCtx.fetchFilteredResultsHandler(token, criteria, targetWord);
  };

  useEffect(() => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].startsWith("jwt=Bearer")) {
        setToken(cookies[i]);
      }
    }

    token !== undefined && employeesDataCtx.fetchAllEmployeesDataHandler(token);
  }, [token]);

  return (
    <PageBoilerplate onTriggerReloadEmployees={props.onTriggerReloadEmployees}>
      <div className={classes["filters-card"]}>
        <h2>Search for Employee(s)</h2>
        <form
          className={classes["employees-form"]}
          onSubmit={searchFilterHandler}
        >
          <div className="u-row">
            <label>Find Employee by</label>
            <select
              name="select_option"
              className={classes["select-box"]}
              onChange={(e) => setSelectOption(e.target.value)}
            >
              <option className="option" value="firstName">
                First Name
              </option>
              <option className="option" value="lastName">
                Last Name
              </option>
              <option className="option" value="position">
                Position
              </option>
              <option className="option" value="department">
                Department
              </option>
              <option className="option" value="phone">
                Phone Number
              </option>
              <option className="option" value="email">
                Email Address
              </option>
            </select>
            <input type="text" ref={findRef}></input>
          </div>
          <input
            type="submit"
            className={classes["employees-submit-button"]}
            value="Find Employee"
          />
        </form>
        <div className={classes["match-form-width"]}>
          <ButtonWide
            label="View All Employees"
            function={viewAllUsersHandler}
          />
        </div>
        <h2>Sort Employees</h2>
        <div className={classes["buttons-wrapper"]}>
          <ButtonStandard
            label="Last Name (A to Z)"
            function={sortLastNameAtoZHandler}
          />
          <ButtonStandard
            label="Last Name (Z to A)"
            function={sortLastNameZtoAHandler}
          />
          <ButtonStandard
            label="Position (A to Z)"
            function={sortPositionAtoZHandler}
          />
          <ButtonStandard
            label="Position (Z to A)"
            function={sortPositionZtoAHandler}
          />
          <ButtonStandard
            label="Department (A to Z)"
            function={sortDepartmentAtoZHandler}
          />
          <ButtonStandard
            label="Department (Z to A)"
            function={sortDepartmentZtoAHandler}
          />
        </div>
      </div>

      <div className={classes["employees-wrapper"]}>
        {employeesDataCtx.employeesState &&
          employeesDataCtx.employeesState.map((user) => {
            return (
              <EmployeeCard
                photo={`${user.photo}`}
                name={`${user.firstName} ${user.lastName}`}
                department={`${user.department || "N/A"}`}
                position={`${user.position || "N/A"}`}
                phone={`${user.phone || "N/A"}`}
                email={`${user.email}`}
                key={`${user.email}`}
              />
            );
          })}
      </div>
    </PageBoilerplate>
  );
};

export default Employees;
