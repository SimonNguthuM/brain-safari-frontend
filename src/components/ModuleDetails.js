import React, { useState, useEffect } from "react";
import ResourceDetail from "./ResourceDetail";

const ModuleDetails = ({ moduleId }) => {
  const [resources, setResources] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [feedback, setFeedback] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resourceRes, quizRes] = await Promise.all([
          fetch(`https://brain-safari-backend.onrender.com/modules/${moduleId}/resources`, {
            credentials: "include",
          }),
          fetch(`https://brain-safari-backend.onrender.com/modules/${moduleId}/quizzes`, {
            credentials: "include",
          }),
        ]);

        if (resourceRes.ok) {
          const resourceData = await resourceRes.json();
          setResources(resourceData);
        } else {
          console.error("Failed to fetch resources");
        }

        if (quizRes.ok) {
          const quizData = await quizRes.json();
          setQuizzes(quizData);
        } else {
          console.error("Failed to fetch quizzes");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [moduleId]);

  const handleQuizAnswerChange = (questionId, value) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: value });
  };

  const handleQuizSubmit = async () => {
    try {
      const response = await fetch(`https://brain-safari-backend.onrender.com/quizzes/${selectedQuiz.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ selected_option: quizAnswers[selectedQuiz.id] }),
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback(`Quiz submitted! You scored ${data.score} points.`);
        setShowQuizModal(false);
      } else {
        const error = await response.json();
        setFeedback(error.error);
      }
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

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

          <h3>Quizzes</h3>
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz">
                <h4>{quiz.question}</h4>
                <p>{quiz.description}</p>
                <button onClick={() => { setSelectedQuiz(quiz); setShowQuizModal(true); }}>
                  Take Quiz
                </button>
              </div>
            ))
          ) : (
            <p>No quizzes available.</p>
          )}
        </div>
      ) : (
        <ResourceDetail resource={selectedResource} />
      )}

      {}
      {showQuizModal && selectedQuiz && (
        <div className="quiz-modal">
          <div className="modal-content">
            <button onClick={() => setShowQuizModal(false)}>Close</button>
            <h3>{selectedQuiz.question}</h3> {}
            <p>{selectedQuiz.description}</p>
            {selectedQuiz.options && selectedQuiz.options.length > 0 ? (
              selectedQuiz.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={option}
                    name="quizOption"
                    value={option}
                    onChange={(e) => handleQuizAnswerChange(selectedQuiz.id, e.target.value)}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))
            ) : (
              <p>No options available for this quiz.</p>
            )}
            <button onClick={handleQuizSubmit}>Submit Quiz</button>
          </div>
        </div>
      )}

      {feedback && <p style={{ color: "green" }}>{feedback}</p>}
    </div>
  );
};

export default ModuleDetails;
