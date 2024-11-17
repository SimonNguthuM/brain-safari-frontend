import React, { useState } from "react";
import { useUser } from "./App";
import Dashboard from "./Dashboard";
import LearningPaths from "./LearningPaths/LearningPathsList";
import Events from "./Events";
import Community from "./Community";
import Certificates from "./Certificates";

const Profile = () => {
  const { user, isAuthenticated } = useUser();
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const componentsMap = {
    Dashboard: <Dashboard />,
    "Learning Paths": <LearningPaths />,
    Events: <Events />,
    Community: <Community />,
    Certificates: <Certificates />,
  };

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="profile-container">
      {}
      <div className="navbar">
        <div className="brand-logo">Brainsafari</div>
        <div className="user-info">
          <span>{new Date().toLocaleDateString()}</span>
          <div className="settings">
            <span>🔔</span>
            <span>⚙️</span>
          </div>
          <div className="username">{user?.name}</div>
        </div>
      </div>

      {}
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

        {}
        <div className="main-content">
          {componentsMap[activeComponent]}
        </div>
      </div>
    </div>
  );
};

export default Profile;
