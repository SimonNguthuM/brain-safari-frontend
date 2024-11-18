import React, { useState, useEffect } from "react";
import ResourceDetail from "./ResourceDetail";

const ModuleDetails = ({ moduleIdProp }) => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      if (!moduleIdProp) {
        console.error("No moduleIdProp provided");
        return;
      }

      try {
        const response = await fetch(`https://brain-safari-backend.onrender.com/modules/${moduleIdProp}/resources`, {
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
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [moduleIdProp]);

  return (
    <div className="module-details">
      {loading ? (
        <p>Loading resources...</p>
      ) : (
        <div>
          <h3>Resources in Module</h3>
          {resources.length > 0 ? (
            <ul>
              {resources.map((resource) => (
                <li key={resource.id}>
                  <button
                    onClick={() => setSelectedResource(resource)}
                    className="resource-button"
                  >
                    {resource.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No resources available for this module.</p>
          )}
          <div className="resource-detail-container">
            <ResourceDetail resource={selectedResource} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleDetails;
