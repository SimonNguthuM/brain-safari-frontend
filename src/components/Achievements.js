import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../achievements.css";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const { user } = useOutletContext();
  const username = user?.username;

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

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("https://brain-safari-backend.onrender.com/leaderboard");
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5555/users/${username}/points`
        );
        const data = await response.json();
        setUserPoints(data.points);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    if (username) {
      fetchUserPoints();
    }
  }, [username]);

  if (!username) return null;

  return (
    <div className="achievements-dashboard">
      {}
      <div className="profile-section">
        <div className="profile-circle">
          <span>{username.charAt(0).toUpperCase()}</span>
        </div>
        <h2>{username}</h2>
        <p>🇰🇪 Kenya</p>
        <p>{username}@gmail.com</p>
      </div>

      {}
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

      {}
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
          <p>{userPoints}</p> {}
        </div>
      </div>

      {}
      <div className="leaderboard-section">
        <h3>Leaderboard</h3>
        <ul>
          {leaderboard.map((leader, index) => (
            <li key={index}>
              <span>{leader.username}</span>
              <span>{leader.points}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Achievements;
