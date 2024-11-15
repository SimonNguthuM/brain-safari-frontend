import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ModuleQuizzes = () => {
  const { moduleId } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`/modules/${moduleId}/quizzes`);
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes", error);
      }
    };
    fetchQuizzes();
  }, [moduleId]);

  return (
    <div>
      <h2>Quizzes in Module {moduleId}</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/quizzes/${quiz.id}/content`}>{quiz.title}</Link>
            <p>Points: {quiz.points}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleQuizzes;
