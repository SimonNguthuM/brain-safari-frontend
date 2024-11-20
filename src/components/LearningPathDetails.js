import React, { useState, useEffect } from "react";
import ModuleDetails from "./ModuleDetails";

const LearningPathDetails = ({ pathId, toggleView }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`https://brain-safari-backend.onrender.com/learning-paths/${pathId}/modules`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setModules(data);
        } else {
          console.error("Failed to fetch modules");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [pathId]);

  return (
    <div className="learning-path-details">
      <button onClick={toggleView}>Back to Learning Paths</button>
      {loading ? (
        <p>Loading modules...</p>
      ) : (
        <div>
          <h2>Modules</h2>
          <ul>
            {modules.map((module) => (
              <li key={module.id}>
                <button onClick={() => setSelectedModuleId(module.id)}>
                  {module.title}
                </button>
              </li>
            ))}
          </ul>
          {selectedModuleId && <ModuleDetails moduleId={selectedModuleId} />}
        </div>
      )}
    </div>
  );
};

export default LearningPathDetails;
