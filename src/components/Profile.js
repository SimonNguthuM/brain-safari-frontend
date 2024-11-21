import React, { useState, useEffect } from "react";
import Achievements from "./Achievements";
import Community from "./Community";
import Content from "./Content";

const Profile = () => {
  const componentsMap = {
    Dashboard: <Achievements />,
    Content: <Content />,
    Community: <Community userId={1} />,
  };

  const [activeComponent, setActiveComponent] = useState(() => {
    return sessionStorage.getItem("activeComponent") || "Dashboard";
  });

  useEffect(() => {
    sessionStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

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
          {componentsMap[activeComponent]}
        </div>
      </div>
    </div>
  );
};

export default Profile;
