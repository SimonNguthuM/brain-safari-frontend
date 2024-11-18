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
    newModules[moduleIndex].resources[resourceIndex][e.target.name] =
      e.target.value;
    setModules(newModules);
  };

  const addModule = () => {
    setModules([
      ...modules,
      {
        title: "",
        description: "",
        resources: [{ title: "", url: "", type: "", description: "" }],
      },
    ]);
  };

  const addResource = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].resources.push({
      title: "",
      url: "",
      type: "",
      description: "",
    });
    setModules(newModules);
  };

  const validateForm = () => {
    const errors = [];

    // Check if title or description is empty
    if (!title.trim()) errors.push("Learning path title is required.");
    if (!description.trim())
      errors.push("Learning path description is required.");

    // Check if all modules and resources are filled
    modules.forEach((module, moduleIndex) => {
      if (!module.title.trim())
        errors.push(`Module ${moduleIndex + 1} title is required.`);
      if (!module.description.trim())
        errors.push(`Module ${moduleIndex + 1} description is required.`);
      module.resources.forEach((resource, resourceIndex) => {
        if (!resource.title.trim())
          errors.push(
            `Resource ${resourceIndex + 1} in Module ${
              moduleIndex + 1
            } title is required.`
          );
        if (!resource.url.trim())
          errors.push(
            `Resource ${resourceIndex + 1} in Module ${
              moduleIndex + 1
            } URL is required.`
          );
      });
    });

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();

    if (errors.length > 0) {
      setFormErrors(errors);
      return; // Prevent submission if there are errors
    }

    // Clear errors if form is valid
    setFormErrors([]);

    fetch("https://brain-safari-backend.onrender.comlearning-paths", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, description, modules }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Learning path created!");

        // Clear the form after successful submission
        setTitle("");
        setDescription("");
        setModules([
          {
            title: "",
            description: "",
            resources: [{ title: "", url: "", type: "", description: "" }],
          },
        ]);
      })
      .catch(console.error);
  };

  return (
    <div>
      {/* Show the list of learning paths created by the current contributor */}
      <ContributorLearningPathsList />

      {/* Show form errors if any */}
      {formErrors.length > 0 && (
        <div style={{ color: "red" }}>
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form to create a new learning path */}
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

          {module.resources.map((resource, resourceIndex) => (
            <div key={resourceIndex}>
              <h5>Resource {resourceIndex + 1}</h5>
              <input
                type="text"
                placeholder="Resource Title"
                name="title"
                value={resource.title}
                onChange={(e) =>
                  handleResourceChange(moduleIndex, resourceIndex, e)
                }
                className={resource.title.trim() === "" ? "error" : ""}
              />
              <input
                type="url"
                placeholder="Resource URL"
                name="url"
                value={resource.url}
                onChange={(e) =>
                  handleResourceChange(moduleIndex, resourceIndex, e)
                }
                className={resource.url.trim() === "" ? "error" : ""}
              />
              <input
                type="text"
                placeholder="Resource Type (Video, Article, etc.)"
                name="type"
                value={resource.type}
                onChange={(e) =>
                  handleResourceChange(moduleIndex, resourceIndex, e)
                }
              />
              <textarea
                placeholder="Resource Description"
                name="description"
                value={resource.description}
                onChange={(e) =>
                  handleResourceChange(moduleIndex, resourceIndex, e)
                }
              />
            </div>
          ))}
          <button onClick={() => addResource(moduleIndex)}>Add Resource</button>
        </div>
      ))}
      <button onClick={addModule}>Add Module</button>
      <button onClick={handleSubmit}>Create Learning Path</button>
    </div>
  );
};

export default CreateLearningPath;
