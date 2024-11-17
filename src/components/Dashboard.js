import React, { useEffect, useState } from "react";
import { useUser } from "../App";
import Points from "./Points";
import Leaderboard from "./LeaderBoard";

const Dashboard = () => {
  const { user, isAuthenticated } = useUser();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `http://127.0.0.1:5555/users/${user.username}/achievements`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAchievements(data);
        } else {
          console.error("Failed to fetch achievements:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchAchievements();
  }, [user]);

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  const getInitials = (name) => {
    const names = name.split(" ");
    if (names.length === 1) return names[0][0];
    return `${names[0][0]}${names[1][0]}`;
  };

  return (
    <div className="dashboard-container">
      <div className="profile-header">
        <div className="profile-avatar">{getInitials(user.username)}</div>
        <div className="profile-info">
          <h2>{user.username}</h2>
          <p>Learner</p>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="achievements-section">
        <h3>Achievements</h3>
        <div className="achievements-list">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement">
              <img src={achievement.icon_url} alt={achievement.name} />
              <span>{achievement.name}</span>
            </div>
          ))}
        </div>
      </div>

      {}
      <Points username={user.username} />
      <Leaderboard />
    </div>
  );
};

export default Dashboard;
