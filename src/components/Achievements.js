import React, { useEffect, useState } from "react";
import axios from "axios";

const Achievements = ({ userId }) => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`/users/${userId}/achievements`);
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements", error);
      }
    };

    fetchAchievements();
  }, [userId]);

  return (
    <div className="achievements-container">
      <h2>Your Achievements</h2>
      <ul className="achievements-list">
        {achievements.map((achievement) => (
          <li key={achievement.id} className="achievement-item">
            <img src={achievement.icon_url} alt={`${achievement.name} icon`} />
            <div className="achievement-details">
              <h3>{achievement.name}</h3>
              <p>{achievement.description}</p>
              <span>Points Required: {achievement.points_required}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
