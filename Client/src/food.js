import React, { useState, useEffect } from 'react';
import BlogService from './blogService';
import { Filter } from 'bad-words'; 

// Create a new filter instance
const filter = new Filter();

const FoodBlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  useEffect(() => {
    fetchFoodBlogPosts();
  }, []);

  const fetchFoodBlogPosts = async () => {
    try {
      const response = await BlogService.getBlogsByCategory("food");
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching food blog posts:", error);
      setError("Failed to load food blogs.");
      setLoading(false);
    }
  };

  const fetchComments = async (postId) => {
    setActivePostId(postId);
    try {
      setLoadingComments(true);
      const response = await BlogService.getComments(postId);
      setComments(response.data);
      setLoadingComments(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoadingComments(false);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!commentName || !commentContent) {
      alert("Name and comment are required!");
      return;
    }

    // Apply the bad-words filter to both the name and the comment content
    const filteredName = filter.clean(commentName);
    const filteredComment = filter.clean(commentContent);

    // Check if either the name or the comment contains bad words
    if (filteredName !== commentName || filteredComment !== commentContent) {
      alert("Your name or comment contains inappropriate language.");
      return;
    }

    try {
      // If both the name and comment are clean, post the comment
      await BlogService.postComments(commentName, commentContent, postId);
      fetchComments(postId); // refresh after post
      setCommentName("");
      setCommentContent("");
      setShowCommentForm(false);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div style={pageContainer}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>🍽️ Food Blog</h1>
      </header>

      {loading ? (
        <p style={loadingText}>Loading...</p>
      ) : error ? (
        <p style={errorText}>{error}</p>
      ) : (
        <div style={blogContainer}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} style={postCardStyle}>
                <h2 style={postTitleStyle}>{post.title}</h2>
                <p style={postDescriptionStyle}>{post.content || post.description}</p>

                <div style={buttonRowStyle}>
                  <button
                    style={viewCommentsButtonStyle}
                    onClick={() => fetchComments(post.id)}
                  >
                    View Comments
                  </button>

                  <button
                    style={addCommentButtonStyle}
                    onClick={() => {
                      setShowCommentForm((prev) => !prev);
                      setActivePostId(post.id);
                    }}
                  >
                    Add Comment
                  </button>
                </div>

                {activePostId === post.id && showCommentForm && (
                  <div style={commentFormContainer}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      style={inputStyle}
                    />
                    <textarea
                      placeholder="Your Comment"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      style={textareaStyle}
                    />
                    <button
                      style={postCommentButtonStyle}
                      onClick={() => handleCommentSubmit(post.id)}
                    >
                      Post Comment
                    </button>
                  </div>
                )}

                {activePostId === post.id && (
                  loadingComments ? (
                    <p style={loadingText}>Loading Comments...</p>
                  ) : (
                    <div style={commentsContainer}>
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <div key={comment.id} style={commentCardStyle}>
                            <strong>{comment.name}</strong>
                            <p>{comment.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </div>
                  )
                )}
              </div>
            ))
          ) : (
            <p style={noPostsMessage}>No food blog posts available.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Styles (adjusted for single column layout)
const pageContainer = {
  fontFamily: 'Arial, sans-serif',
  background: '#fffaf0',
  padding: '20px',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '40px',
};

const titleStyle = {
  color: '#ff6347',
  fontSize: '36px',
};

const blogContainer = {
  display: 'flex',
  flexDirection: 'column', // Ensure a single column layout
  gap: '20px', // Space between blog posts
};

const postCardStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
};

const postTitleStyle = {
  fontSize: '24px',
  color: '#333',
};

const postDescriptionStyle = {
  color: '#666',
};

const buttonRowStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
};

const viewCommentsButtonStyle = {
  backgroundColor: '#0066cc',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const addCommentButtonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const commentFormContainer = {
  marginTop: '20px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  height: '100px',
};

const postCommentButtonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const commentsContainer = {
  marginTop: '20px',
};

const commentCardStyle = {
  background: '#f9f9f9',
  padding: '10px',
  borderRadius: '5px',
  marginTop: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const loadingText = {
  textAlign: 'center',
  fontSize: '18px',
  color: '#555',
};

const errorText = {
  textAlign: 'center',
  fontSize: '18px',
  color: 'red',
};

const noPostsMessage = {
  textAlign: 'center',
  fontSize: '18px',
  color: '#888',
};

export default FoodBlogPage;
























































