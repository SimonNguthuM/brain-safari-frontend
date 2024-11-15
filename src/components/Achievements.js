import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import '../index.css';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const { username, handleLogout } = useOutletContext();

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
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-coral-300 flex flex-col justify-center items-center py-10">
      {}
      <div className="w-full px-6 py-4 bg-teal-700 flex justify-between items-center">
        {}
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Logout
        </button>
        <h1 className="text-white text-2xl font-bold">Achievements</h1>
      </div>

      {}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mt-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-4">{username}</h2>
        <p className="text-lg text-teal-600 mb-2">Kenya</p>
        <p className="text-lg text-teal-600 mb-6">{username}@gmail.com</p>

        <div className="badges-section mb-6">
          <h3 className="text-2xl font-semibold text-teal-700 mb-4">Badges</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="badge p-4 bg-teal-100 rounded-lg shadow-md text-center">
                <img
                  src={achievement.icon_url}
                  alt={achievement.name}
                  className="mx-auto mb-2 w-16 h-16 object-contain"
                />
                <span className="block text-teal-700 font-medium">{achievement.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
