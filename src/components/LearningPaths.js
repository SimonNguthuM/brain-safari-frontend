import React, { useState, useEffect } from "react";
import LearningPathDetails from "./LearningPathDetails";

const LearningPaths = () => {
  const [availablePaths, setAvailablePaths] = useState([]);
  const [enrolledPaths, setEnrolledPaths] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  const [isEnrolledView, setIsEnrolledView] = useState(true);

  const toggleView = () => setSelectedPath(null);

  useEffect(() => {
    fetch("https://brain-safari-backend.onrender.com/learning-paths", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setAvailablePaths)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("https://brain-safari-backend.onrender.com/learning-paths/enrolled", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setEnrolledPaths(data);
        setAvailablePaths((prev) =>
          prev.filter((path) => !data.some((enrolled) => enrolled.id === path.id))
        );
      })
      .catch(console.error);
  }, []);

  const handleEnroll = (pathId) => {
    fetch(`https://brain-safari-backend.onrender.com/learning-paths/${pathId}/enroll`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.learning_path) {
          setEnrolledPaths((prev) => [...prev, data.learning_path]);
          setAvailablePaths((prev) =>
            prev.filter((path) => path.id !== data.learning_path.id)
          );
        }
      })
      .catch(console.error);
  };

  return (
    <div className="learning-paths">
      <div className="toggle-view">
        <button
          className={isEnrolledView ? "active" : ""}
          onClick={() => setIsEnrolledView(true)}
        >
          Enrolled Learning Paths
        </button>
        <button
          className={!isEnrolledView ? "active" : ""}
          onClick={() => setIsEnrolledView(false)}
        >
          Available Learning Paths
        </button>
      </div>

      {!selectedPath ? (
        <div>
          {isEnrolledView ? (
            <ul>
              {enrolledPaths.map((path) => (
                <li key={path.id}>
                  <button onClick={() => setSelectedPath(path)}>
                    {path.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {availablePaths.map((path) => (
                <li key={path.id}>
                  <span>{path.title}</span>
                  <button onClick={() => handleEnroll(path.id)}>Enroll</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <LearningPathDetails pathId={selectedPath.id} toggleView={toggleView} />
      )}
    </div>
  );
};

export default LearningPaths;
