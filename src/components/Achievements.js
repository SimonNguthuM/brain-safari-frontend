import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../achievements.css";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const { user } = useOutletContext();
  const username = user?.username;
  const points = user?.points || 0; 
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `https://brain-safari-backend.onrender.com/users/${username}/achievements`
        );
        const data = await response.json();
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    if (username) {
      fetchAchievements();
    }
  }, [username]);

  if (!username) return null;

  return (
    <div className="achievements-dashboard">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-circle">
          <span>{username.charAt(0).toUpperCase()}</span>
        </div>
        <h2>{username}</h2>
        <p>🇰🇪 Kenya</p>
        <p>{username}@gmail.com</p>
      </div>

      {/* Badges Section */}
      <div className="badges-section">
        <h3>Badges</h3>
        <div className="badges">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="badge">
              <img src={achievement.icon_url} alt={achievement.name} />
            </div>
          ))}
        </div>
      </div>

      {/* XP and Points Section */}
      <div className="xp-points-section">
        <div className="xp-section">
          <h3>XP</h3>
          <img
            src="https://www.shutterstock.com/image-vector/gold-silver-bronze-medals-realistic-260nw-1719627340.jpg"
            alt="XP Medals"
            className="xp-medals"
          />
        </div>
        <div className="points-section">
          <h3>Points</h3>
          <p>{points}</p> {/* Display the user's points */}
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="leaderboard-section">
        <h3>Leaderboard</h3>
        <ul>
          <li>
            <span>Ez</span>
            <span>1,000</span>
          </li>
          <li>
            <span>Ef</span>
            <span>900</span>
          </li>
          <li>
            <span>Ed</span>
            <span>870</span>
          </li>
          <li>
            <span>Edd</span>
            <span>810</span>
          </li>
          <li>
            <span>El</span>
            <span>780</span>
          </li>
          <li>
            <span>Es</span>
            <span>750</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Achievements;
