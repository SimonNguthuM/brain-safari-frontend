import React, { useState, useEffect } from "react";

const ChallengeDetails = ({
  challengeId,
  onClose,
  onUpdate,
  onDelete,
  isAdmin,
}) => {
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    fetch(
      `https://brain-safari-backend.onrender.com/challenges/${challengeId}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then(setChallenge)
      .catch(console.error);
  }, [challengeId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = new FormData(e.target);

    fetch(
      `https://brain-safari-backend.onrender.com/challenges/${challengeId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(updatedData)),
      }
    )
      .then((res) => res.json())
      .then((updatedChallenge) => {
        setChallenge(updatedChallenge);
        onUpdate(updatedChallenge);
      })
      .catch(console.error);
  };

  if (!challenge) return <div>Loading...</div>;

  return (
    <div className="challenge-details">
      <button onClick={onClose}>Back</button>
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <p>Points: {challenge.points_reward}</p>
      <p>
        Start Date: {new Date(challenge.start_date).toLocaleDateString()} - End
        Date: {new Date(challenge.end_date).toLocaleDateString()}
      </p>
      {isAdmin && (
        <form onSubmit={handleUpdate}>
          <input
            name="title"
            placeholder="Update title"
            defaultValue={challenge.title}
          />
          <textarea
            name="description"
            placeholder="Update description"
            defaultValue={challenge.description}
          />
          <button type="submit">Update</button>
        </form>
      )}
      {isAdmin && (
        <button onClick={() => onDelete(challenge.id)}>Delete</button>
      )}
    </div>
  );
};

export default ChallengeDetails;
