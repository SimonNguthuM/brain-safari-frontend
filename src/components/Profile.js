import React, { useState } from "react";
import Dashboard from "./Dashboard"; 
import Events from "./Events";
import Community from "./Community";
import Certificates from "./Certificates";

const Profile = () => {
  const [activeComponent, setActiveComponent] = useState(null); // No default active component

  const componentsMap = {
    Dashboard: <Dashboard />,
    // "Learning Paths": <LearningPaths />,
    Events: <Events />,
    Community: <Community />,
    Certificates: <Certificates />,
  };

  return (
    <div className="profile-container">
      <div className="content">
        <div className="sidebar">
          {Object.keys(componentsMap).map((key) => (
            <button
              key={key}
              onClick={() => setActiveComponent(key)}
              className={activeComponent === key ? "active" : ""}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="main-content">
          {activeComponent ? componentsMap[activeComponent] : <p>Select a section to view content.</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
