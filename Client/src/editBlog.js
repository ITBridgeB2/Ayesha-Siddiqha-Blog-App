import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BlogService from './blogService';
import { Filter } from 'bad-words'; // ✅ Correct named import

const EditBlog = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(state?.title || '');
  const [description, setDescription] = useState(state?.description || '');

  const filter = new Filter();

  const handleUpdate = async () => {
    if (!title || !description) {
      alert("Both title and description are required.");
      return;
    }

    if (filter.isProfane(title) || filter.isProfane(description)) {
      alert("Your input contains inappropriate language. Please revise it.");
      return;
    }

    try {
      await BlogService.updateBlogDetails(id, { title, description });
      alert("Blog updated successfully!");
      navigate('/blogList');
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update blog. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '2px solid #ccc', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Edit Blog</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <textarea 
        placeholder="Description" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', height: '100px', padding: '10px', marginBottom: '10px' }}
      />
      <button 
        onClick={handleUpdate} 
        style={{ padding: '10px 20px', background: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px' }}
      >
        Update
      </button>
    </div>
  );
};

export default EditBlog;










































// import React, { useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import BlogService from './blogService';

// const EditBlog = () => {
//   const { state } = useLocation();
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState(state?.title || '');
//   const [description, setDescription] = useState(state?.description || '');

//   const handleUpdate = async () => {
//     await BlogService.updateBlogDetails(id, { title, description });
//     alert("Blog updated successfully!");
//     navigate('/blogList');
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '2px solid #ccc', borderRadius: '10px' }}>
//       <h2 style={{ textAlign: 'center' }}>Edit Blog</h2>
//       <input 
//         type="text" 
//         placeholder="Title" 
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//       />
//       <textarea 
//         placeholder="Description" 
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         style={{ width: '100%', height: '100px', padding: '10px', marginBottom: '10px' }}
//       />
//       <button 
//         onClick={handleUpdate} 
//         style={{ padding: '10px 20px', background: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px' }}
//       >
//         Update
//       </button>
//     </div>
//   );
// };

// export default EditBlog;
