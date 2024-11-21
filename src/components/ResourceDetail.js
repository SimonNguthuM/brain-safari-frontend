import React, { useState, useEffect } from "react";

const ResourceDetail = ({ resource }) => {
  const [showContent, setShowContent] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [newRating, setNewRating] = useState(3);

  useEffect(() => {
    if (resource) {
      fetchFeedback(resource.id);
    }
  }, [resource]);

  const fetchFeedback = (resourceId) => {
    fetch(`https://brain-safari-backend.onrender.com/resources/${resourceId}/feedbacks`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setFeedbackList)
      .catch((err) => console.error("Error fetching feedback:", err));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!newFeedback) {
      alert("Please write some feedback before submitting.");
      return;
    }

    fetch("https://brain-safari-backend.onrender.com/feedbacks", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newFeedback,
        resource_id: resource.id,
        rating: newRating,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.feedback_id) {
          alert("Feedback submitted successfully!");
          setFeedbackList((prev) => [
            ...prev,
            {
              id: data.feedback_id,
              comment: data.comment,
              rating: data.rating,
              created_at: new Date().toISOString(),
            },
          ]);
          setNewFeedback("");
          setNewRating(3);
        } else {
          alert("Error submitting feedback. Please try again.");
        }
      })
      .catch((err) => console.error("Error submitting feedback:", err));
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
        <strong>Description:</strong>{" "}
        {resource.description || "No description available."}
      </p>

      {}
      <button
        onClick={() => setShowContent((prev) => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        {showContent ? "Hide Content" : "View Content"}
      </button>
      {showContent && (
        <div className="resource-content mt-4">
          <iframe
            src={resource.url}
            title="Resource Content"
            style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
          ></iframe>
        </div>
      )}

      {}
      <button
        onClick={() => setShowFeedback((prev) => !prev)}
        className="bg-teal-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        {showFeedback ? "Hide Feedback" : "View Feedback"}
      </button>
      {showFeedback && (
        <div className="feedback-section mt-4">
          <h5>Feedback</h5>
          <ul>
            {feedbackList.map((feedback) => (
              <li key={feedback.id} className="bg-white shadow p-4 rounded-lg">
                <p className="text-gray-700">{feedback.comment}</p>
                <p className="text-gray-500">Rating: {feedback.rating}/5</p>
              </li>
            ))}
          </ul>

          {}
          <form onSubmit={handleFeedbackSubmit} className="mt-4">
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Write your feedback..."
              rows="4"
              className="border p-2 w-full rounded-lg"
            />
            <div className="mt-2">
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
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
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-lg mt-4">
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResourceDetail;
