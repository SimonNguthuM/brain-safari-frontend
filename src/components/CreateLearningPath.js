import React, { useState, useEffect } from "react";

const ContributorLearningPathsList = () => {
  const [learningPaths, setLearningPaths] = useState([]);

  useEffect(() => {
    fetch("https://brain-safari-backend.onrender.com/created-learning-paths", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setLearningPaths(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h3>Your Created Learning Paths</h3>
      <ul>
        {learningPaths.length > 0 ? (
          learningPaths.map((path) => (
            <li key={path.id}>
              <h4>{path.title}</h4>
              <p>{path.description}</p>
            </li>
          ))
        ) : (
          <p>You haven't created any learning paths yet. Create one below!</p>
        )}
      </ul>
    </div>
  );
};

const CreateLearningPath = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState([
    {
      title: "",
      description: "",
      resources: [{ title: "", url: "", type: "", description: "" }],
      quizzes: [],
    },
  ]);
  const [formErrors, setFormErrors] = useState([]);

  const handleModuleChange = (index, e) => {
    const newModules = [...modules];
    newModules[index][e.target.name] = e.target.value;
    setModules(newModules);
  };

  const handleResourceChange = (moduleIndex, resourceIndex, e) => {
    const newModules = [...modules];
    newModules[moduleIndex].resources[resourceIndex][e.target.name] = e.target.value;
    setModules(newModules);
  };

  const handleQuizChange = (moduleIndex, quizIndex, e) => {
    const newModules = [...modules];
    newModules[moduleIndex].quizzes[quizIndex][e.target.name] = e.target.value;
    setModules(newModules);
  };

  const handleOptionChange = (moduleIndex, quizIndex, optionIndex, e) => {
    const newModules = [...modules];
    newModules[moduleIndex].quizzes[quizIndex].options[optionIndex] = e.target.value;
    setModules(newModules);
  };

  const addModule = () => {
    setModules([
      ...modules,
      { title: "", description: "", resources: [{ title: "", url: "", type: "", description: "" }], quizzes: [] },
    ]);
  };

  const addResource = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].resources.push({ title: "", url: "", type: "", description: "" });
    setModules(newModules);
  };

  const addQuiz = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].quizzes.push({
      question: "",
      options: ["", "", "", ""],
      correct_option: "",
      points: "",
    });
    setModules(newModules);
  };

  const validateForm = () => {
    const errors = [];
    if (!title.trim()) errors.push("Learning path title is required.");
    if (!description.trim()) errors.push("Learning path description is required.");

    modules.forEach((module, moduleIndex) => {
      if (!module.title.trim()) errors.push(`Module ${moduleIndex + 1} title is required.`);
      if (!module.description.trim()) errors.push(`Module ${moduleIndex + 1} description is required.`);
      module.resources.forEach((resource, resourceIndex) => {
        if (!resource.title.trim()) errors.push(`Resource ${resourceIndex + 1} in Module ${moduleIndex + 1} title is required.`);
        if (!resource.url.trim()) errors.push(`Resource ${resourceIndex + 1} in Module ${moduleIndex + 1} URL is required.`);
        if (!resource.type.trim()) errors.push(`Resource ${resourceIndex + 1} in Module ${moduleIndex + 1} type is required.`);
      });
      module.quizzes.forEach((quiz, quizIndex) => {
        if (!quiz.question.trim()) errors.push(`Quiz ${quizIndex + 1} in Module ${moduleIndex + 1} question is required.`);
        if (!quiz.correct_option.trim()) errors.push(`Quiz ${quizIndex + 1} in Module ${moduleIndex + 1} correct option is required.`);
        if (!quiz.points.trim()) errors.push(`Quiz ${quizIndex + 1} in Module ${moduleIndex + 1} points are required.`);
      });
    });

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
  
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }
  
    setFormErrors([]);
  
    // 1. Create learning path
    fetch("https://brain-safari-backend.onrender.com/learning-paths", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, description, modules }),
    })
      .then((res) => res.json())
      .then((createdLearningPath) => {
        const quizPromises = [];
  
        
        createdLearningPath.modules.forEach((module, moduleIndex) => {
          module.quizzes.forEach((quiz) => {
            const quizPromise = fetch(`https://brain-safari-backend.onrender.com/modules/${module.id}/quizzes`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                question: quiz.question,
                options: quiz.options,
                correct_option: quiz.correct_option,
                points: quiz.points,
              }),
            })
              .then((res) => res.json())
              .then(() => {
                console.log("Quiz created:", quiz);
              })
              .catch((error) => {
                console.error("Quiz creation failed:", error);
                throw new Error("Quiz creation failed");
              });
  
            quizPromises.push(quizPromise);
          });
        });
  
        // Wait for all quiz creation promises to resolve
        Promise.all(quizPromises)
          .then(() => {
            alert("Learning path and quizzes created!");
            setTitle("");
            setDescription("");
            setModules([
              { title: "", description: "", resources: [{ title: "", url: "", type: "", description: "" }], quizzes: [] },
            ]);
          })
          .catch(console.error);
      })
      .catch(console.error);
  };
  

  return (
    <div>
      <ContributorLearningPathsList />

      {formErrors.length > 0 && (
        <div style={{ color: "red" }}>
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="text"
        placeholder="Learning Path Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={title.trim() === "" ? "error" : ""}
      />
      <textarea
        placeholder="Learning Path Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={description.trim() === "" ? "error" : ""}
      />

      {modules.map((module, moduleIndex) => (
        <div key={moduleIndex}>
          <h4>Module {moduleIndex + 1}</h4>
          <input
            type="text"
            placeholder="Module Title"
            name="title"
            value={module.title}
            onChange={(e) => handleModuleChange(moduleIndex, e)}
            className={module.title.trim() === "" ? "error" : ""}
          />
          <textarea
            placeholder="Module Description"
            name="description"
            value={module.description}
            onChange={(e) => handleModuleChange(moduleIndex, e)}
            className={module.description.trim() === "" ? "error" : ""}
          />

          <button onClick={() => addQuiz(moduleIndex)}>Add Quiz</button>
          {module.quizzes.map((quiz, quizIndex) => (
            <div key={quizIndex}>
              <input
                type="text"
                placeholder="Quiz Question"
                name="question"
                value={quiz.question}
                onChange={(e) => handleQuizChange(moduleIndex, quizIndex, e)}
              />
              {quiz.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(moduleIndex, quizIndex, optionIndex, e)}
                />
              ))}
              <input
                type="text"
                placeholder="Correct Option"
                name="correct_option"
                value={quiz.correct_option}
                onChange={(e) => handleQuizChange(moduleIndex, quizIndex, e)}
              />
              <input
                type="number"
                placeholder="Points"
                name="points"
                value={quiz.points}
                onChange={(e) => handleQuizChange(moduleIndex, quizIndex, e)}
              />
            </div>
          ))}

          <button onClick={() => addResource(moduleIndex)}>Add Resource</button>
          {module.resources.map((resource, resourceIndex) => (
            <div key={resourceIndex}>
              <h5>Resource {resourceIndex + 1}</h5>
              <input
                type="text"
                placeholder="Resource Title"
                name="title"
                value={resource.title}
                onChange={(e) => handleResourceChange(moduleIndex, resourceIndex, e)}
                className={resource.title.trim() === "" ? "error" : ""}
              />
              <input
                type="text"
                placeholder="Resource Type"
                name="type"
                value={resource.type}
                onChange={(e) => handleResourceChange(moduleIndex, resourceIndex, e)}
                className={resource.type.trim() === "" ? "error" : ""}
              />
              <input
                type="text"
                placeholder="Resource URL"
                name="url"
                value={resource.url}
                onChange={(e) => handleResourceChange(moduleIndex, resourceIndex, e)}
                className={resource.url.trim() === "" ? "error" : ""}
              />
              <textarea
                placeholder="Resource Description"
                name="description"
                value={resource.description}
                onChange={(e) => handleResourceChange(moduleIndex, resourceIndex, e)}
                className={resource.description.trim() === "" ? "error" : ""}
              />
            </div>
          ))}
        </div>
      ))}

      <button onClick={addModule}>Add Module</button>
      <button onClick={handleSubmit}>Create Learning Path</button>
    </div>
  );
};

export default CreateLearningPath;