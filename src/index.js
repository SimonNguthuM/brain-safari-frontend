import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Achievements from "./components/Achievements";
import Events from "./components/Events";
import Certificates from "./components/Certificates";
import Community from "./components/Community";
import About from "./components/About"
import AdminUserManagement from "./components/AdminUserManagement";
import App, { UserProvider } from "./App";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/about", element: <About /> },

      { path: "/profile", element: <Profile /> },
      { path: "/achievements", element: <Achievements /> },
      { path: "/events", element: <Events /> },
      { path: "/certificates", element: <Certificates /> },
      { path: "/community", element: <Community /> },
      { path: "/admin/user-management", element: <AdminUserManagement /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
