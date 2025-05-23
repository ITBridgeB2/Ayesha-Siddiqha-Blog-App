import React, { useEffect, useState } from 'react';
import BlogService from './blogService';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await BlogService.getBlogDetails();
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      alert("Error fetching blogs.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await BlogService.deleteBlog(id);
      fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Error deleting blog.");
    }
  };

  const handleEdit = (blog) => {
    navigate(`/editBlog/${blog.id}`, { state: blog });
  };

  const handleBack = () => {
    navigate('/userProfile');
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '30px',
    background: '#f0f8ff',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0, 102, 204, 0.3)',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#004080',
    marginBottom: '20px',
    fontSize: '24px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
  };

  const thStyle = {
    backgroundColor: '#cce0ff',
    color: '#003366',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #99c2ff',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'top',
  };

  const buttonStyle = {
    padding: '6px 12px',
    marginRight: '8px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ffc107',
    color: '#333',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: '#fff',
  };

  const backButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: '#fff',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleBack} style={backButtonStyle}>🔙 Back to Add Blog</button>
      <h2 style={headingStyle}>📋 All Blogs</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td style={tdStyle}>{blog.title}</td>
              <td style={tdStyle}>{blog.description}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(blog)} style={editButtonStyle}>✏️ Edit</button>
                <button onClick={() => handleDelete(blog.id)} style={deleteButtonStyle}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;

































































