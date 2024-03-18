import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Route, Router, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import User from "./pages/users/User";
import AuthProvider from "./contexts/AuthContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
     <App/>
  </AuthProvider>
);