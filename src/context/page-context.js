import React, { useReducer } from "react";

const PageContext = React.createContext({
  state: {
    page: "startMenu",
  },
  goToSignUpHandler: () => {},
  goToLogInHandler: () => {},
  goToStartMenuHandler: () => {},
  goToAnnouncementsHandler: () => {},
  goToErrorTemplateHandler: () => {},
  goToEmailResetTokenHandler: () => {},
  goToUseResetTokenHandler: () => {},
  goToEmployeesHandler: () => {},
});

const initialState = {
  page: "startMenu",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "goToStartMenu":
      return { page: (state.page = "startMenu") };
    case "goToSignUp":
      return { page: (state.page = "signUp") };
    case "goToLogIn":
      return { page: (state.page = "logIn") };
    case "goToAnnouncements":
      return { page: (state.page = "announcements") };
    case "goToUnauthorized":
      return { page: (state.page = "unauthorized") };
    case "goToErrorTemplate":
      return { page: (state.page = "errorTemplate") };
    case "goToDuplicateUser":
      return { page: (state.page = "duplicateUser") };
    case "goToEmailResetToken":
      return { page: (state.page = "emailResetToken") };
    case "goToUseResetToken":
      return { page: (state.page = "useResetToken") };
    case "goToEmployees":
      return { page: (state.page = "employees") };
    default:
      return console.log("Reducer has triggered default switch");
  }
};

export const PageContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const goToSignUpHandler = () => {
    dispatch({ type: "goToSignUp" });
  };

  const goToLogInHandler = () => {
    dispatch({ type: "goToLogIn" });
  };

  const goToStartMenuHandler = () => {
    dispatch({ type: "goToStartMenu" });
  };

  const goToAnnouncementsHandler = () => {
    dispatch({ type: "goToAnnouncements" });
  };

  const goToErrorTemplateHandler = () => {
    dispatch({ type: "goToErrorTemplate" });
  };

  const goToEmailResetTokenHandler = () => {
    dispatch({ type: "goToEmailResetToken" });
  };

  const goToUseResetTokenHandler = () => {
    dispatch({ type: "goToUseResetToken" });
  };

  const goToEmployeesHandler = () => {
    dispatch({ type: "goToEmployees" });
  };

  return (
    <PageContext.Provider
      value={{
        state,
        goToSignUpHandler,
        goToLogInHandler,
        goToStartMenuHandler,
        goToAnnouncementsHandler,
        goToErrorTemplateHandler,
        goToEmailResetTokenHandler,
        goToUseResetTokenHandler,
        goToEmployeesHandler,
      }}
    >
      {props.children}
    </PageContext.Provider>
  );
};

export default PageContext;
