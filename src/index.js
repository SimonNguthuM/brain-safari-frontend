import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/components/Home";
import Login from "../src/components/Login";
import SignUp from "../src/components/SignUp";
import Profile from "./components/Profile";
import Dashboard from "../src/components/Dashboard";
import Events from "./components/Events";
import Certificates from "./components/Certificates";
import Community from "./components/Community";
import Points from "./components/Points";
import LeaderBoard from "./components/LeaderBoard";
// import LearnerPaths from "./components/LearnerPaths";
// import ContributorPaths from "./components/ContributorPaths";
// import AdminPage from "./components/AdminPage";
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
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/events", element: <Events /> },
      { path: "/certificates", element: <Certificates /> },
      { path: "/community", element: <Community /> },
      { path: "/points", element: <Points /> },
      { path: "/leaderboard", element: <LeaderBoard /> },
      // { path: "/learner_paths", element: <LearnerPaths /> }, // Learner's specific path
      // { path: "/contributor_paths", element: <ContributorPaths /> }, // Contributor's specific path
      // { path: "/admin_paths", element: <AdminPage /> }, // Admin's specific path
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
