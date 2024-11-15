import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import '../index.css';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const { username } = useOutletContext();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`https://brain-safari-backend.onrender.com/users/${username}/achievements`);
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

  return (
    <div className="achievements-dashboard">
      <h2>{username}</h2>
      <p>Kenya</p>
      <p>{username}@gmail.com</p>

      <div className="badges-section">
        <h3>Badges</h3>
        <div className="badges">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="badge">
              <img src={achievement.icon_url} alt={achievement.name} />
              <span>{achievement.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;