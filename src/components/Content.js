import React, { useState } from "react";
import LearningPaths from "./LearningPaths";
import CreateLearningPath from "./CreateLearningPath";
import { useUser } from "../App";

const Content = () => {
  const { user } = useUser();
  const [activeView, setActiveView] = useState("default");

  const toggleView = (view) => {
    setActiveView((prevView) => (prevView === view ? "default" : view));
  };

  return (
    <div className="content-container">
      {user.role === "Learner" && (
        <>
          <button onClick={() => toggleView("learningPaths")}>
            {activeView === "learningPaths" ? "Hide Learning Paths" : "View Learning Paths"}
          </button>
          {activeView === "learningPaths" && <LearningPaths />}
        </>
      )}
      {user.role === "Contributor" && (
        <>
          <button onClick={() => toggleView("createPath")}>
            {activeView === "createPath" ? "Hide Learning Path Creator" : "Create Learning Path"}
          </button>
          {activeView === "createPath" && <CreateLearningPath />}
        </>
      )}
    </div>
  );
};

export default Content;
