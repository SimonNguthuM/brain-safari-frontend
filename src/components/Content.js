import React, { useState } from "react";
import LearningPaths from "./LearningPaths";
import CreateLearningPath from "./CreateLearningPath";
import { useUser } from "../App";

const Content = () => {
  const { user } = useUser();
  const [activeView, setActiveView] = useState("default");

  return (
    <div className="content-container">
      {user.role === "Learner" && (
        <>
          <button onClick={() => setActiveView("learningPaths")}>
            View Learning Paths
          </button>
          {activeView === "learningPaths" && <LearningPaths />}
        </>
      )}
      {user.role === "Contributor" && (
        <>
          <button onClick={() => setActiveView("createPath")}>
            Create Learning Path
          </button>
          {activeView === "createPath" && <CreateLearningPath />}
        </>
      )}
    </div>
  );
};

export default Content;
