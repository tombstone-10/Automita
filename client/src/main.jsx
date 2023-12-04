import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./hooks/isLogedInHook.jsx";
import { UserProvider } from "./hooks/LogedUserHook.jsx";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <UserProvider>
    <App />
    </UserProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
