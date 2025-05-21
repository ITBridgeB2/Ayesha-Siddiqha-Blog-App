import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h1 style={styles.logo}>My Blog App</h1>
      <div style={styles.profileContainer}>
        <span style={styles.icon} onClick={toggleDropdown}>
          ☰
        </span>
        {isDropdownOpen && (
          <div style={styles.dropdown}>
            <button style={styles.dropdownItem} onClick={() => navigate("/userProfile")}>
              👤 User Profile
            </button>
            <button style={styles.dropdownItem} onClick={handleLogout}>
              🔓 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#1f2937",
    color: "#fff",
    position: "relative",
  },
  logo: {
    fontSize: "1.5rem",
  },
  profileContainer: {
    position: "relative",
  },
  icon: {
    fontSize: "1.5rem",
    cursor: "pointer",
    userSelect: "none",
  },
  dropdown: {
    position: "absolute",
    top: "2.5rem",
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  dropdownItem: {
    display: "block",
    padding: "0.5rem 1rem",
    backgroundColor: "#fff",
    border: "none",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
