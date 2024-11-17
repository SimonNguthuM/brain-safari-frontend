import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/components/Home";
import Login from "../src/components/Login";
import SignUp from "../src/components/SignUp";
import Dashboard from "../src/components/Dashboard";
import LearningPathsList from "./components/LearningPaths/LearningPathsList";
// import CreateLearningPath from "../src/components/LearningPaths/CreateLearningPath";
// import EnrollLearningPath from "../src/components/LearningPaths/EnrollLearningPath";
// import LearningPathModules from "../src/components/LearningPaths/LearningPathModules";
// import CreateModule from "../src/components/Modules/CreateModule";
// import ModuleResources from "../src/components/Modules/ModuleResources";
// import CreateResource from "../src/components/Resources/CreateResource";
import App, { UserProvider } from "./App"; // Import UserProvider
import './index.css'; 

// Define routes
const router = createBrowserRouter([
  { 
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/profile", element: <Dashboard /> },
      { path: "/learning_paths", element: <LearningPathsList /> },
      // { path: "/learning_paths/create", element: <CreateLearningPath /> },
      // { path: "/learning_path/:learning_path_id/enroll", element: <EnrollLearningPath /> },
      // { path: "/learning_path/:learning_path_id/modules", element: <LearningPathModules /> },
      // { path: "/learning_path/:learning_path_id/module/create", element: <CreateModule /> },
      // { path: "/module/:module_id/resources", element: <ModuleResources /> },
      // { path: "/module/:module_id/resource/create", element: <CreateResource /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
); 