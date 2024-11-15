import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogout } = useOutletContext();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("auth_token");
        const response = await fetch("https://brain-safari-backend.onrender.com/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch profile.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <aside className="sidebar">
        <button onClick={() => navigate("/")} className="sidebar-button">Dashboard</button>
        <button onClick={() => navigate("/events")} className="sidebar-button">Events</button>
        <button onClick={() => navigate("/community")} className="sidebar-button">Community</button>
        <button onClick={() => navigate("/certificates")} className="sidebar-button">Certificates</button>
        <button onClick={() => navigate("/learning-paths")} className="sidebar-button">Learning Paths</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </aside>
      
      <main className="profile-content">
        <div className="profile-header">
          <h2>{profile.username}</h2>
        </div>
        <div className="profile-info">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      </main>
    </div>
  );
};

export default Profile;
