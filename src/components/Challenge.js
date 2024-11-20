import React, { useState, useEffect } from "react";
import ChallengeCard from "./ChallengeCard";
import ChallengeDetails from "./ChallengeDetails";

const Challenge = ({ isAdmin }) => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  // Fetch all challenges
  useEffect(() => {
    fetch("https://brain-safari-backend.onrender.com/challenges", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setChallenges)
      .catch(console.error);
  }, []);

  // Handle marking a challenge as completed
  const handleComplete = (challengeId) => {
    fetch(
      `https://brain-safari-backend.onrender.com/challenge/${challengeId}/complete`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setChallenges((prev) =>
          prev.map((challenge) =>
            challenge.id === challengeId
              ? { ...challenge, completed: true }
              : challenge
          )
        );
      })
      .catch(console.error);
  };

  // Handle deleting a challenge
  const handleDelete = (challengeId) => {
    fetch(
      `https://brain-safari-backend.onrender.com/challenge/${challengeId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then((res) => {
        if (res.ok) {
          setChallenges((prev) =>
            prev.filter((challenge) => challenge.id !== challengeId)
          );
        }
      })
      .catch(console.error);
  };

  // Handle updating a challenge
  const handleUpdate = (updatedChallenge) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === updatedChallenge.id ? updatedChallenge : challenge
      )
    );
  };

  return (
    <div className="challenge">
      {!selectedChallengeId ? (
        <div className="challenge-list">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onSelect={(selected) => setSelectedChallengeId(selected.id)}
              onComplete={handleComplete}
            />
          ))}
        </div>
      ) : (
        <ChallengeDetails
          challengeId={selectedChallengeId}
          onClose={() => setSelectedChallengeId(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default Challenge;
