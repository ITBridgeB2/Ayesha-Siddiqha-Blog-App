import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogService from './blogService'; // adjust path as necessary

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await BlogService.validateUser(form.username, form.password);
  //     if (response.data) {
  //       alert("Login successful");
  //       navigate("/"); // Redirect to home or dashboard
        
  //     } else {
  //       setError("Invalid username or password.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError("Invalid username or password.");
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await BlogService.validateUser(form.username, form.password);
      if (response.data) {
        // Save authentication status and username in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", response.data.username); // Adjust key if backend returns differently
  
        alert("Login successful");
        navigate("/"); // Redirect to home or dashboard
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  };
  

  const styles = {
    form: {
      maxWidth: '400px',
      margin: '60px auto',
      padding: '30px',
      background: '#e6f0fa',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0, 123, 255, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '12px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #b3d4fc',
      backgroundColor: '#f7fbff',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007BFF',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    error: {
      color: 'red',
      fontSize: '14px',
      textAlign: 'center',
    },
    title: {
      textAlign: 'center',
      fontSize: '26px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#004085',
    },
  };

  return (
    <form onSubmit={handleLogin} style={styles.form}>
      <h2 style={styles.title}>Login</h2>
      {error && <div style={styles.error}>{error}</div>}
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        style={styles.input}
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>Login</button>
    </form>
  );
}


















































// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { loginUser } from '../api/authService'; // Uncomment and adjust if using external API service

// export default function Login() {
//   const [form, setForm] = useState({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//     //   await loginUser(form); // Use your defined login function
//       alert("Login successful");
//       navigate("/"); // Redirect to home or dashboard
//     } catch (err) {
//       setError("Invalid username or password.");
//     }
//   };

//   const styles = {
//     form: {
//       maxWidth: '400px',
//       margin: '60px auto',
//       padding: '30px',
//       background: '#e6f0fa',
//       borderRadius: '12px',
//       boxShadow: '0 8px 20px rgba(0, 123, 255, 0.2)',
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '15px',
//     },
//     input: {
//       padding: '12px',
//       fontSize: '16px',
//       borderRadius: '6px',
//       border: '1px solid #b3d4fc',
//       backgroundColor: '#f7fbff',
//     },
//     button: {
//       padding: '12px',
//       backgroundColor: '#007BFF',
//       color: '#fff',
//       fontWeight: 'bold',
//       fontSize: '16px',
//       border: 'none',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s ease',
//     },
//     error: {
//       color: 'red',
//       fontSize: '14px',
//       textAlign: 'center',
//     },
//     title: {
//       textAlign: 'center',
//       fontSize: '26px',
//       fontWeight: 'bold',
//       marginBottom: '10px',
//       color: '#004085',
//     },
//   };

//   return (
//     <form onSubmit={handleLogin} style={styles.form}>
//       <h2 style={styles.title}>Login</h2>
//       {error && <div style={styles.error}>{error}</div>}
//       <input
//         name="username"
//         value={form.username}
//         onChange={handleChange}
//         placeholder="Username"
//         style={styles.input}
//         required
//       />
//       <input
//         name="password"
//         type="password"
//         value={form.password}
//         onChange={handleChange}
//         placeholder="Password"
//         style={styles.input}
//         required
//       />
//       <button type="submit" style={styles.button}>Login</button>
//     </form>
//   );
// }
