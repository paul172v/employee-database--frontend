import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { PageContextProvider } from "./context/page-context";
import { ErrorContextProvider } from "./context/error-context";

import { EmployeesDataContextProvider } from "./context/employees-data-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PageContextProvider>
      <ErrorContextProvider>
        <EmployeesDataContextProvider>
          <App />
        </EmployeesDataContextProvider>
      </ErrorContextProvider>
    </PageContextProvider>
  </React.StrictMode>
);
