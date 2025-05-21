import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogService from './blogService';

const UserProfile = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Manual list of bad words (extend as needed)
  // const badWords = ['badword1', 'badword2', 'nastyword', 'offensive'];
  const badWords = [
  'ass', 'asshole', 'bastard', 'bitch', 'bollocks', 'bullshit',
  'cock', 'crap', 'cunt', 'damn', 'dildo', 'dyke',
  'fag', 'faggot', 'fuck', 'fucked', 'fucker', 'fucking',
  'goddamn', 'jerk', 'kike', 'motherfucker', 'nigger', 'nigga',
   'piss', 'prick', 'pussy', 'retard', 'shit', 'shitty',
  'slut', 'spic', 'twat', 'whore', 'wank', 'wanker'
];



  // Function to check for bad words
  const containsBadWords = (text) => {
    const lowerText = text.toLowerCase();
    return badWords.some(word => lowerText.includes(word));
  };

  const handleAdd = async () => {
    if (!title || !description) {
      alert("Both title and description are required.");
      return;
    }

    if (containsBadWords(title) || containsBadWords(description)) {
      alert("Your post contains inappropriate language. Please remove it before submitting.");
      return;
    }

    try {
      await BlogService.postBlogDetails(title, description);
      setTitle('');
      setDescription('');
      alert("Blog posted successfully!");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to post blog. Please try again.");
    }
  };

  const handleView = () => {
    navigate('/blogList');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const containerStyle = {
    position: 'relative',
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to right, #e6f0ff, #cce0ff)',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#004080',
    marginBottom: '20px',
    fontSize: '24px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #b3d1ff',
    borderRadius: '8px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 25px',
    margin: '5px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0066cc',
    color: '#fff',
  };

  const viewButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0052a3',
    color: '#fff',
  };

  const backButtonStyle = {
    ...buttonStyle,
    position: 'absolute',
    top: '10px',
    left: '10px',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to right, #e6f0ff, #cce0ff)',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleBackHome} style={backButtonStyle}>🔙</button>
      <h2 style={headingStyle}>📘 Add a New Blog</h2>
      <input
        type="text"
        placeholder="Enter Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Enter Blog Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
      />
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleAdd} style={addButtonStyle}>➕ Add</button>
        <button onClick={handleView} style={viewButtonStyle}>📄 View Blogs</button>
      </div>
    </div>
  );
};

export default UserProfile;
















































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BlogService from './blogService';

// const UserProfile = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const navigate = useNavigate();

//   const handleAdd = async () => {
//     if (!title || !description) {
//       alert("Both title and description are required.");
//       return;
//     }
//     try {
//       await BlogService.postBlogDetails(title, description);
//       setTitle('');
//       setDescription('');
//       alert("Blog posted successfully!");
//     } catch (error) {
//       console.error("Error adding blog:", error);
//       alert("Failed to post blog. Please try again.");
//     }
//   };

//   const handleView = () => {
//     navigate('/blogList');
//   };

//   const handleBackHome = () => {
//     navigate('/');
//   };

//   const containerStyle = {
//     position: 'relative', // Allow absolute positioning of the button
//     maxWidth: '400px',
//     margin: '50px auto',
//     padding: '30px',
//     borderRadius: '12px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     background: 'linear-gradient(to right, #e6f0ff, #cce0ff)',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const headingStyle = {
//     textAlign: 'center',
//     color: '#004080',
//     marginBottom: '20px',
//     fontSize: '24px',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '12px',
//     marginBottom: '15px',
//     border: '1px solid #b3d1ff',
//     borderRadius: '8px',
//     fontSize: '16px',
//   };

//   const buttonStyle = {
//     padding: '10px 25px',
//     margin: '5px',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '16px',
//     cursor: 'pointer',
//   };

//   const addButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: '#0066cc',
//     color: '#fff',
//   };

//   const viewButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: '#0052a3',
//     color: '#fff',
//   };

//   const backButtonStyle = {
//     ...buttonStyle,
//     position: 'absolute', // Absolute position to top-left
//     top: '10px',
//     left: '10px',
//     // backgroundColor: '#999',
//     color: '#fff',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     background: 'linear-gradient(to right, #e6f0ff, #cce0ff)',
//   };

//   return (
//     <div style={containerStyle}>
//       <button onClick={handleBackHome} style={backButtonStyle}>🔙</button>
//       <h2 style={headingStyle}>📘 Add a New Blog</h2>
//       <input
//         type="text"
//         placeholder="Enter Blog Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         style={inputStyle}
//       />
//       <textarea
//         placeholder="Enter Blog Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
//       />
//       <div style={{ textAlign: 'center' }}>
//         <button onClick={handleAdd} style={addButtonStyle}>➕ Add</button>
//         <button onClick={handleView} style={viewButtonStyle}>📄 View Blogs</button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;





















































