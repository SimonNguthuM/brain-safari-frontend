import React, { useState, useEffect } from "react";
import ResourceDetail from "./ResourceDetail";

const ModuleDetails = ({ moduleId, pathId }) => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://brain-safari-backend.onrender.com/modules/${moduleId}/resources`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setResources(data);
        } else {
          console.error("Failed to fetch resources");
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchData();
  }, [moduleId]);

  return (
    <div className="module-details">
      <button onClick={() => setSelectedResource(null)}>Back to Modules</button>
      {!selectedResource ? (
        <div>
          <h3>Resources</h3>
          <ul>
            {resources.map((resource) => (
              <li key={resource.id}>
                <button onClick={() => setSelectedResource(resource)}>
                  {resource.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ResourceDetail resource={selectedResource} pathId={pathId} />
      )}
    </div>
  );
};

export default ModuleDetails;
