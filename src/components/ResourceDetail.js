import React, { useState } from "react";

const ResourceDetail = ({ resource }) => {
  const [showContent, setShowContent] = useState(false);

  const handleButtonClick = () => {
    setShowContent((prev) => !prev);
  };

  if (!resource) {
    return <p>Select a resource to view details.</p>;
  }

  return (
    <div className="resource-detail">
      <h4>Resource Details</h4>
      <p>
        <strong>Title:</strong> {resource.title}
      </p>
      <p>
        <strong>Description:</strong> {resource.description || "No description available."}
      </p>
      <button onClick={handleButtonClick}>
        {showContent ? "Hide Content" : "View Content"}
      </button>
      {showContent && (
        <div className="resource-content">
          <iframe
            src={resource.url}
            title="Resource Content"
            style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ResourceDetail;
