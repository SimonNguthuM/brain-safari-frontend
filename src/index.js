import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import Certificates from "./components/Certificates";
import Community from "./components/Community";
import Feedback from "./components/Feedback";
import Challenge from "./components/Challenge";
import LeaderBoard from "./components/LeaderBoard";
import AdminUserManagement from "./components/AdminUserManagement";
import App, { UserProvider } from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/feedback", element: <Feedback /> },
      { path: "/challenge", element: <Challenge /> },
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/events", element: <Events /> },
      { path: "/certificates", element: <Certificates /> },
      { path: "/community", element: <Community /> },
      { path: "/leaderboard", element: <LeaderBoard /> },

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
