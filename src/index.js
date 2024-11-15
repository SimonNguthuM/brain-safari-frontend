import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/components/Home";
import Login from "../src/components/Login";
import SignUp from "../src/components/SignUp";
import Achievements from "../src/components/Achievements";
import App from "./App"; 
import './index.css'; 

const router = createBrowserRouter([
  { 
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/profile", element: <Achievements /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
