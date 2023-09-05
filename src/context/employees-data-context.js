import React, { useState, useContext } from "react";

import errorContext from "./error-context";

const EmployeesDataContext = React.createContext({
  employeesState: [],
  fetchAllEmployeesDataHandler: () => {},
  fetchFilteredResultsHandler: () => {},
  sortLastNameAtoZHandler: () => {},
  sortLastNameZtoAHandler: () => {},
  sortPositionAtoZHandler: () => {},
  sortPositionZtoAHandler: () => {},
  sortDepartmentAtoZHandler: () => {},
  sortDepartmentZtoAHandler: () => {},
  updateCurrentUserHandler: () => {},
  currentUserState: null,
  getUserFromToken: () => {},
  reloadUser: false,
  turnOnReloadUserHandler: () => {},
  turnOffReloadUserHandler: () => {},
  photoCounter: 0,
  increasePhotoCounterHandler: () => {},
});

export const EmployeesDataContextProvider = (props) => {
  const [employeesState, setEmployeesState] = useState([]);
  const [currentUserState, setCurrentUserState] = useState(null);
  const [photoCounter, setPhotoCounter] = useState(0);

  const [reloadUser, setReloadUser] = useState(true);

  const errorCtx = useContext(errorContext);

  const fetchAllEmployeesDataHandler = async (token) => {
    await fetch("http://127.0.0.1:5000/api/v1/users/", {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployeesState(data.payload);
      });
  };

  const fetchFilteredResultsHandler = (token, criteria, targetWord) => {
    fetch("http://127.0.0.1:5000/api/v1/users/specific-search", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        criteria,
        targetWord,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setEmployeesState(data.payload);
        } else {
          document.cookie = `jwt=null`;
          errorCtx.changeErrorStateHandler(
            data.status,
            data.message,
            props.onGoToStartMenu
          );
          errorCtx.goToErrorTemplateHandler();
        }
      });
  };

  const sortLastNameAtoZHandler = async (token) => {
    await fetch("http://127.0.0.1:5000/api/v1/users/sort-users", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        users: employeesState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.payload);
        const sortedUsers = data.payload.sort((a, b) => {
          return a.lastName > b.lastName;
        });

        setEmployeesState(sortedUsers);
      });
  };

  const sortLastNameZtoAHandler = (token) => {
    fetch("http://127.0.0.1:5000/api/v1/users/sort-users", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        users: employeesState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.payload);
        const sortedUsers = data.payload.sort((a, b) => {
          return a.lastName < b.lastName;
        });

        setEmployeesState(sortedUsers);
      });
  };

  const sortPositionAtoZHandler = (token) => {
    fetch("http://127.0.0.1:5000/api/v1/users/sort-users", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        users: employeesState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.payload);
        const sortedUsers = data.payload.sort((a, b) => {
          return a.position > b.position;
        });
        console.log(sortedUsers);

        setEmployeesState(sortedUsers);
      });
  };

  const sortPositionZtoAHandler = (token) => {
    fetch("http://127.0.0.1:5000/api/v1/users/sort-users", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        users: employeesState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.payload);
        const sortedUsers = data.payload.sort((a, b) => {
          return a.position < b.position;
        });
        console.log(sortedUsers);

        setEmployeesState(sortedUsers);
      });
  };

  const sortDepartmentAtoZHandler = (token) => {
    fetch("http://127.0.0.1:5000/api/v1/users/sort-users", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        users: employeesState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.payload);
        const sortedUsers = data.payload.sort((a, b) => {
          return a.department > b.department;
        });
        console.log(sortedUsers);

        setEmployeesState(sortedUsers);
      });
  };

  const sortDepartmentZtoAHandler = (token) => {
    fetch("http://127.0.0.1:5000/api/v1/users/sort-users", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        users: employeesState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.payload);
        const sortedUsers = data.payload.sort((a, b) => {
          return a.department < b.department;
        });

        setEmployeesState(sortedUsers);
      });
  };

  const getUserFromToken = async (token) => {
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
        setCurrentUserState(data.payload);
      });
  };

  const updateCurrentUserHandler = (userObject) => {
    setCurrentUserState(userObject);
  };

  const turnOnReloadUserHandler = () => {
    setReloadUser(true);
  };

  const turnOffReloadUserHandler = () => {
    setReloadUser(false);
  };

  const increasePhotoCounterHandler = () => {
    setPhotoCounter(photoCounter + 1);
  };

  return (
    <EmployeesDataContext.Provider
      value={{
        employeesState,
        fetchAllEmployeesDataHandler,
        fetchFilteredResultsHandler,
        sortLastNameAtoZHandler,
        sortLastNameZtoAHandler,
        sortPositionAtoZHandler,
        sortPositionZtoAHandler,
        sortDepartmentAtoZHandler,
        sortDepartmentZtoAHandler,
        updateCurrentUserHandler,
        currentUserState,
        getUserFromToken,
        reloadUser,
        turnOnReloadUserHandler,
        turnOffReloadUserHandler,
        photoCounter,
        increasePhotoCounterHandler,
      }}
    >
      {props.children}
    </EmployeesDataContext.Provider>
  );
};

export default EmployeesDataContext;
