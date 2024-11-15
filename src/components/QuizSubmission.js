import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";

const QuizSubmission = () => {
  const { user } = useContext(UserContext);
  const { quiz_id } = useParams();
  const [score, setScore] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const answers = [...event.target.elements]
      .filter((el) => el.checked)
      .map((el) => parseInt(el.value));

    if (user) {
      try {
        const response = await axios.post(`/quizzes/${quiz_id}/submit`, {
          user_id: user.id,
          answers: answers,
        });
        setScore(response.data.score);
      } catch (error) {
        console.error("Error submitting quiz", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <div>
      <h2>Submit Quiz</h2>
      <form onSubmit={handleSubmit}>
        {/* Quiz Content Questions go here */}
        <button type="submit">Submit Quiz</button>
      </form>
      {score !== null && <p>Your Score: {score}</p>}
    </div>
  );
};

export default QuizSubmission;
