import React, { useState } from "react";
import Dashboard from "./Dashboard";
import LearningPaths from "./LearningPaths/LearningPathsList";
import Events from "./Events";
import Community from "./Community";
import Certificates from "./Certificates";

const Profile = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const componentsMap = {
    Dashboard: <Dashboard />,
    "Learning Paths": <LearningPaths />,
    Events: <Events />,
    Community: <Community />,
    Certificates: <Certificates />,
  };

  return (
    <div className="profile-container">
      
      <div className="content">
        <div className="sidebar">
          <button
            onClick={() => setActiveComponent("Dashboard")}
            className={activeComponent === "Dashboard" ? "active" : ""}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveComponent("Learning Paths")}
            className={activeComponent === "Learning Paths" ? "active" : ""}
          >
            Learning Paths
          </button>
          <button
            onClick={() => setActiveComponent("Events")}
            className={activeComponent === "Events" ? "active" : ""}
          >
            Events
          </button>
          <button
            onClick={() => setActiveComponent("Community")}
            className={activeComponent === "Community" ? "active" : ""}
          >
            Community
          </button>
          <button
            onClick={() => setActiveComponent("Certificates")}
            className={activeComponent === "Certificates" ? "active" : ""}
          >
            Certificates
          </button>
        </div>

        <div className="main-content">
          {componentsMap[activeComponent]}
        </div>
      </div>
    </div>
  );
};

export default Profile;
