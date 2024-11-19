import React from "react";

const ChallengeCard = ({ challenge, onSelect, onComplete }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:bg-teal-50">
      <h3 className="text-lg font-semibold text-teal-600">{challenge.title}</h3>
      <p className="text-gray-600">Points: {challenge.points_reward}</p>
      <p className="text-gray-500 text-sm">
        Start: {new Date(challenge.start_date).toLocaleDateString()}
      </p>
      <p className="text-gray-500 text-sm">
        End: {new Date(challenge.end_date).toLocaleDateString()}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          onClick={() => onSelect(challenge)}
        >
          View Details
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={() => onComplete(challenge.id)}
        >
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
