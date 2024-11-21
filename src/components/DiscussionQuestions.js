import React, { useEffect, useState } from "react";

const DiscussionQuestions = ({ courseId }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversationShow, setConversationShow] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5555/resources/${courseId}/comments`
        );
        const data = await response.json();

        // Create a map of user IDs to user details
        const userIds = [...new Set(data.map((comment) => comment.user.id))];
        const userPromises = userIds.map((userId) =>
          fetch(`http://127.0.0.1:5555/users/${userId}`).then((res) =>
            res.json()
          )
        );

        const users = await Promise.all(userPromises);
        const userMap = users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});

        // Map comments to include user details and creation date
        const commentsWithUserDetails = data.map((comment) => ({
          id: comment.id,
          user: {
            name: userMap[comment.user.id]?.username || "Unknown",
            avatar: userMap[comment.user_id]?.avatar || "/default-avatar.png",
            timeAgo: formatTimeAgo(comment.created_at),
          },
          title: comment.title,
          question: comment.content,
          createdAt: comment.created_at,
          messages: [], // Initialize messages array for each comment
        }));

        // Sort comments by creation date (most recent first)
        commentsWithUserDetails.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setQuestions(commentsWithUserDetails);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [courseId]);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const handleConversationShow = async (question) => {
    try {
      // Fetch conversation messages for the specific question
      const response = await fetch(
        `http://127.0.0.1:5555/comment/${question.id}/replies`
      );
      const data = await response.json();

      // Update the selected question with its messages
      const updatedQuestion = {
        ...question,
        messages: data.replies || [],
      };
      console.log("Fetched messages:", data.replies);

      setSelectedConversation(updatedQuestion);
      setConversationShow(true);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const handleConversationClose = () => {
    setConversationShow(false);
    setSelectedConversation(null);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      // Send the new message to the backend
      const response = await fetch(
        `http://127.0.0.1:5555/comments/${selectedConversation.id}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: newMessage,
            // Include any necessary user authentication info
          }),
        }
      );

      const newMessageData = await response.json();

      // Update the conversation with the new message
      setSelectedConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessageData],
      }));

      // Clear the message input
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h4 className="text-xl font-bold mb-4">Discussion Questions</h4>
      <div className="card-body p-0 pt-3">
        <div className="vstack gap-3 p-3">
          {questions.map((question) => (
            <div key={question.id} className="shadow rounded-3 p-3 mb-4">
              <div className="d-sm-flex justify-content-sm-between mb-3">
                <div className="d-flex align-items-center">
                  <div className="avatar avatar-sm flex-shrink-0">
                    <img
                      src={question.user.avatar}
                      className="avatar-img rounded-circle"
                      alt={question.user.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="ms-2">
                    <h6 className="mb-0">
                      <a
                        href="#select"
                        className="text-decoration-none text-dark"
                      >
                        {question.user.name}
                      </a>
                    </h6>
                    <small>{question.user.timeAgo}</small>
                  </div>
                </div>
              </div>
              <h6>{question.title}</h6>
              <h5>{question.question}</h5>
              <button
                className="btn btn-primary btn-sm"
                style={{
                  background: "linear-gradient(90deg, #007bff, #0056b3)",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "25px",
                  transition: "background 0.3s, transform 0.3s",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0056b3";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(90deg, #007bff, #0056b3)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => handleConversationShow(question)}
              >
                Join Conversation <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Modal */}
      {conversationShow && selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] rounded-lg shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {selectedConversation.title} : {selectedConversation.question}
              </h2>

              <button
                onClick={handleConversationClose}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {selectedConversation.messages.map((message, index) => (
                <div key={index} className="flex mb-4 items-start">
                  <img
                    src="/default-avatar.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h6 className="font-bold text-gray-800">
                          {`User  ${message.user_id}`}
                        </h6>
                        <small className="text-gray-500">
                          {formatTimeAgo(message.createdAt)}
                        </small>
                      </div>
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t flex space-x-2"
            >
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-2 border rounded-lg resize-none"
                rows="2"
                placeholder="Type your message..."
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                Send
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionQuestions;
