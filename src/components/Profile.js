// Profile.js
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import "../index.css";

const Profile = () => {
  const { username, handleLogout } = useOutletContext();

  return (
    <div className="profile-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="/path/to/brainsafari-logo.png" alt="Brainsafari Logo" />
        </div>
        <div className="navbar-date">07/11/2024</div>
        <div className="navbar-user">
          <span>{username}</span>
          <img src="/path/to/profile-icon.png" alt="User Icon" className="profile-icon" />
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="main-content">
        <aside className="sidebar">
          <Link to="/dashboard" className="sidebar-item">Dashboard</Link>
          <Link to="/learning-paths" className="sidebar-item">Learning Paths</Link>
          <Link to="/events" className="sidebar-item">Events</Link>
          <Link to="/community" className="sidebar-item">Community</Link>
          <Link to="/certificates" className="sidebar-item">Certificates</Link>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
