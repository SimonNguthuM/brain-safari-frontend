import React from "react";
import Home from "./components/Home";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/quizzes/:quiz_id/content" element={<QuizContent />} />
          <Route path="/quizzes/:quiz_id/submit" element={<QuizSubmission />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
