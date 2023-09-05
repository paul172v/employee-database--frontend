import React, { useState } from "react";

const ErrorContext = React.createContext({
  errorState: {
    status: "error",
    message: "Something went wrong!",
  },
  changeErrorStateHandler: () => {},
});

export const ErrorContextProvider = (props) => {
  const [errorState, setErrorState] = useState({
    status: "error",
    message: "Something went wrong!",
  });

  const changeErrorStateHandler = (status, message, goTo) => {
    setErrorState({
      status,
      message,
      goTo,
    });
  };

  return (
    <ErrorContext.Provider
      value={{
        errorState,
        changeErrorStateHandler,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
