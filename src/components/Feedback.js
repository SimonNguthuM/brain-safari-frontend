import React, { useState, useEffect } from "react";

const Feedback = () => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [newRating, setNewRating] = useState(3);

  // Fetch all modules
  useEffect(() => {
    fetch("https://brain-safari-backend.onrender.com/modules", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setModules)
      .catch(console.error);
  }, []);

  // Fetch resources for a selected module
  const fetchResources = (moduleId) => {
    fetch(`https://brain-safari-backend.onrender.com/resources`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setResources)
      .catch(console.error);
  };

  // Fetch feedback for a specific resource
  const fetchFeedback = (resourceId) => {
    fetch("https://brain-safari-backend.onrender.com/feedbacks", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        setFeedbackList(
          data.filter((feedback) => feedback.resource_id === resourceId)
        )
      )
      .catch(console.error);
  };

  // Handle module selection
  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    fetchResources(module.id);
  };

  // Handle resource selection
  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
    fetchFeedback(resource.id);
  };

  // Submit new feedback
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!selectedResource) {
      alert("Please select a resource first.");
      return;
    }

    fetch("https://brain-safari-backend.onrender.com/feedbacks", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newFeedback,
        resource_id: selectedResource.id,
        rating: newRating,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Feedback submitted successfully!");
        setFeedbackList((prev) => [
          ...prev,
          { id: data.feedback_id, comment: newFeedback, rating: newRating },
        ]);
        setNewFeedback("");
        setNewRating(3);
      })
      .catch(console.error);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold text-teal-600 mb-4">Feedback</h2>

      {/* Module Selection */}
      <div className="mb-6">
        {modules.length === 0 ? (
          <p className="text-red-500">
            No modules available. Check your connection.
          </p>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Select a Module
            </h3>
            <ul className="mb-4">
              {modules.map((module) => (
                <li
                  key={module.id}
                  className={`p-2 cursor-pointer rounded-lg ${
                    selectedModule?.id === module.id
                      ? "bg-teal-500 text-white"
                      : "bg-white text-teal-600 hover:bg-teal-100"
                  }`}
                  onClick={() => handleModuleSelect(module)}
                >
                  {module.title} (ID: {module.id})
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Resource Selection */}
      {selectedModule && resources.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Resources in {selectedModule.title}
          </h3>
          <ul className="mb-4">
            {resources.map((resource) => (
              <li
                key={resource.id}
                className={`p-2 cursor-pointer rounded-lg ${
                  selectedResource?.id === resource.id
                    ? "bg-teal-500 text-white"
                    : "bg-white text-teal-600 hover:bg-teal-100"
                }`}
                onClick={() => handleResourceSelect(resource)}
              >
                {resource.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Feedback Section */}
      {selectedResource && (
        <div>
          <h3 className="text-lg font-semibold text-teal-600 mb-4">
            Feedback for: {selectedResource.title}
          </h3>
          <ul className="space-y-4">
            {feedbackList.map((feedback) => (
              <li key={feedback.id} className="bg-white shadow p-4 rounded-lg">
                <p className="text-gray-700">{feedback.comment}</p>
                <p className="text-gray-500">Rating: {feedback.rating}/5</p>
              </li>
            ))}
          </ul>

          <form onSubmit={handleFeedbackSubmit} className="mt-6">
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="Write your feedback..."
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
            ></textarea>
            <div className="mt-2">
              <label className="block text-sm text-gray-600">
                Rating (1-5):
              </label>
              <select
                value={newRating}
                onChange={(e) => setNewRating(parseInt(e.target.value))}
                className="border p-2 rounded-lg"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-teal-700"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Feedback;
