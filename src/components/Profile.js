import React, { useState, useEffect } from "react";
import Achievements from "./Achievements";
import Community from "./Community";
import Content from "./Content";

const Profile = ({ user }) => {
  const isContributor = user?.role === "Contributor";

  const componentsMap = {
    ...(isContributor ? {} : { Dashboard: <Achievements /> }),
    Content: <Content />,
    Community: <Community userId={user?.id || 1} />,
  };

  const [activeComponent, setActiveComponent] = useState(() => {
    const defaultComponent = isContributor ? "Content" : "Dashboard";
    return sessionStorage.getItem("activeComponent") || defaultComponent;
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
        <div className="main-content">{componentsMap[activeComponent]}</div>
      </div>
    </div>
  );
};

export default Profile;
