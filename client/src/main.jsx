import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./hooks/isLoggedInHook.jsx";
import { UserProvider } from "./hooks/LoggedUserHook.jsx";
import { TimetableProvider } from "./hooks/timetableDataHook.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <TimetableProvider>
            <App />
          </TimetableProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
