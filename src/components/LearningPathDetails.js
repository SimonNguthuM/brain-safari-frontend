import React, { useState, useEffect } from "react";
import ModuleDetails from "./ModuleDetails";

const LearningPathDetails = ({ pathId }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      if (!pathId) {
        console.error("No pathId provided");
        return;
      }

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
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [pathId]);

  return (
    <div className="learning-path-details">
      {loading ? (
        <p>Loading modules...</p>
      ) : (
        <div>
          <h2>Modules in Learning Path</h2>
          {modules.length > 0 ? (
            <ul>
              {modules.map((module) => (
                <li key={module.id}>
                  <button
                    onClick={() => setSelectedModuleId(module.id)}
                    style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
                  >
                    {module.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No modules available for this learning path.</p>
          )}
        </div>
      )}
      {selectedModuleId && (
        <ModuleDetails moduleIdProp={selectedModuleId} />
      )}
    </div>
  );
};

export default LearningPathDetails;
