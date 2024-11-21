import React, { useState, useEffect } from "react";
import "../community.css";

const Community = ({ userId }) => {
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState({});
  const [showUserComments, setShowUserComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [visibleReplies, setVisibleReplies] = useState({});

  useEffect(() => {
    fetch("https://brain-safari-backend.onrender.com/comments")
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  const handleCreateComment = () => {
    fetch("https://brain-safari-backend.onrender.com/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, content: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([data, ...comments]);
        setNewComment("");
      });
  };

  const handleCreateReply = (commentId) => {
    fetch("https://brain-safari-backend.onrender.com/replies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        comment_id: commentId,
        content: newReply,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(
          comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, replies: [...comment.replies, data] };
            }
            return comment;
          })
        );
        setNewReply("");
        setVisibleReplies((prev) => ({ ...prev, [commentId]: true }));
      });
  };

  const toggleUserComments = () => {
    if (!showUserComments) {
      fetch(
        `https://brain-safari-backend.onrender.com/comments/user/${userId}/replies`
      )
        .then((response) => response.json())
        .then((data) => setUserComments(data));
    }
    setShowUserComments(!showUserComments);
  };

  const toggleRepliesVisibility = (commentId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="community">
      <div className="community-header">
        <button onClick={toggleUserComments} className="toggle-button1">
          {showUserComments ? "Show All Comments" : "Show My Comments"}
        </button>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
        />
        <button onClick={handleCreateComment} className="post-button">
          Post Comment
        </button>
      </div>

      {showUserComments ? (
        <div className="user-comments">
          <h3>Your Comments</h3>
          {Array.isArray(userComments.comments) &&
          userComments.comments.length > 0 ? (
            userComments.comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <p>{comment.content}</p>
                <p className="comment-meta">
                  By {comment.username} on {comment.created_at}
                </p>
                <button
                  onClick={() => toggleRepliesVisibility(comment.id)}
                  className="reply-toggle-button"
                >
                  {visibleReplies[comment.id]
                    ? "Hide Replies"
                    : `View Replies (${comment.replies_count})`}
                </button>
                {visibleReplies[comment.id] && (
                  <div className="replies">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply-card">
                        <p>{reply.content}</p>
                        <p className="reply-meta">
                          By {reply.username} on {reply.created_at}
                        </p>
                      </div>
                    ))}
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Write a reply..."
                      className="reply-input"
                    />
                    <button
                      onClick={() => handleCreateReply(comment.id)}
                      className="post-reply-button"
                    >
                      Post Reply
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No comments found.</p>
          )}
        </div>
      ) : (
        <div className="all-comments">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <p>{comment.content}</p>
              <p className="comment-meta">
                By {comment.username} on {comment.created_at}
              </p>
              <button
                onClick={() => toggleRepliesVisibility(comment.id)}
                className="reply-toggle-button"
              >
                {visibleReplies[comment.id]
                  ? "Hide Replies"
                  : `View Replies (${comment.replies_count})`}
              </button>
              {visibleReplies[comment.id] && (
                <div className="replies">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="reply-card">
                      <p>{reply.content}</p>
                      <p className="reply-meta">
                        By {reply.username} on {reply.created_at}
                      </p>
                    </div>
                  ))}
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write a reply..."
                    className="reply-input"
                  />
                  <button
                    onClick={() => handleCreateReply(comment.id)}
                    className="post-reply-button"
                  >
                    Post Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
