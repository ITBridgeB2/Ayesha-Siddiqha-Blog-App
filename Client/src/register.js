import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogService from './blogService'; // Import your BlogService

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call the API to register the user using BlogService
      await BlogService.saveRegisterDetails(form);
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  const styles = {
    form: {
      maxWidth: '400px',
      margin: '60px auto',
      padding: '30px',
      background: '#e6f0fa', // light blue background
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
    buttonHover: {
      backgroundColor: '#0056b3',
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
    <form onSubmit={handleRegister} style={styles.form}>
      <h2 style={styles.title}>Register</h2>
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
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
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
      <input
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>
        Register
      </button>
    </form>
  );
}




















































