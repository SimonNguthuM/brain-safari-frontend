import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

const QuizContent = () => {
  const { quiz_id } = useParams();
  const { user } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuizContent = async () => {
      try {
        const response = await axios.get(`/quizzes/${quiz_id}/content`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching quiz content", error);
      }
    };
    fetchQuizContent();
  }, [quiz_id]);

  if (!user) {
    return <p>Please log in to view this quiz.</p>;
  }

  return (
    <div>
      <h2>Quiz Content</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.content_text}</p>
            {question.options &&
              question.options.map((option) => (
                <div key={option.id}>
                  <input
                    type="radio"
                    id={option.id}
                    name={`question-${question.id}`}
                    value={option.id}
                  />
                  <label htmlFor={option.id}>{option.content_text}</label>
                </div>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizContent;
