import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogService from "./blogService";

export default function HomeWithNavbar() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["travel", "books", "food", "technology", "lifestyle"];

  useEffect(() => {
    document.title = "Blog Categories";
    if (category) {
      fetchBlogsByCategory(category);
    } else {
      setBlogs([]);
      setLoading(false);
    }
  }, [category]);

  const fetchBlogsByCategory = (selectedCategory) => {
    setLoading(true);
    BlogService.getBlogsByCategory(selectedCategory)
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    alert("Logged out successfully");
    navigate("/login");
  };

  // const handleCategoryClick = (selectedCategory) => {
  //   navigate(`/${selectedCategory}`);
  //   fetchBlogsByCategory(selectedCategory);
  // };
  const handleCategoryClick = (selectedCategory) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
  
    if (!isAuthenticated) {
      alert("⚠️ Please login to view blog categories.");
      return;
    }
  
    navigate(`/${selectedCategory}`);
    fetchBlogsByCategory(selectedCategory);
  };
  
 return (
    <div>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>My Blog App</h1>
        <div style={styles.profileContainer}>
          <span style={styles.icon} onClick={toggleDropdown}>☰</span>
          {isDropdownOpen && (
            <div style={styles.dropdown}>
              <button
                style={styles.dropdownItem}
                onClick={() => navigate("/userProfile")}
              >
                👤 User Profile
              </button>
              <button style={styles.dropdownItem} onClick={handleLogout}>
                🔓 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Page Layout */}
      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Blog Manager</h2>
          <nav style={styles.navLinks}>
            <Link to="/register" style={{ ...styles.link, ...styles.register }}>
              Register
            </Link>
            <Link to="/login" style={{ ...styles.link, ...styles.login }}>
              Login
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <div style={styles.card}>
            <h1 style={styles.heading}>Explore Blog Categories</h1>

            {/* Category Buttons */}
            <form style={styles.formGrid}>
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  style={styles.categoryButton}
                >
                  {cat}
                </button>
              ))}
            </form>

            {/* Blog List */}
            {category && (
              <div style={{ marginTop: "3rem" }}>
                <h2 style={{ color: "#1f2937" }}>
                  Blogs in "{category.charAt(0).toUpperCase() + category.slice(1)}"
                </h2>
                {loading ? (
                  <p>Loading...</p>
                ) : blogs.length ? (
                  <div style={{ marginTop: "1rem", display: "grid", gap: "1.5rem" }}>
                    {blogs.map((blog) => (
                      <div key={blog.id} style={{ padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "0.75rem", backgroundColor: "#f9fafb" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1e40af" }}>{blog.title}</h3>
                        <p style={{ marginTop: "0.5rem", color: "#374151" }}>{blog.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No blogs found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 💡 Styles remain unchanged from your original code
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
  container: {
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "#f3f4f6",
  },
  sidebar: {
    width: "16rem",
    backgroundColor: "#1e3a8a",
    color: "white",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  sidebarTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  navLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  link: {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    textAlign: "center",
    color: "white",
    textDecoration: "none",
    transition: "background-color 0.3s",
  },
  register: {
    backgroundColor: "#2563eb",
  },
  login: {
    backgroundColor: "#16a34a",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2.5rem",
    background: "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
  },
  card: {
    width: "100%",
    maxWidth: "64rem",
    backgroundColor: "white",
    padding: "2.5rem",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  heading: {
    fontSize: "2.25rem",
    fontWeight: "700",
    marginBottom: "2.5rem",
    textAlign: "center",
    color: "#1d4ed8",
    letterSpacing: "0.05em",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1.5rem",
  },
  categoryButton: {
    padding: "1.5rem",
    backgroundColor: "#e0e7ff",
    borderRadius: "0.75rem",
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#3730a3",
    textTransform: "capitalize",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, background-color 0.3s",
    cursor: "pointer",
  },
};



























































// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import BlogService from "./blogService";

// export default function HomeWithNavbar() {
//   const navigate = useNavigate();
//   const { category } = useParams();
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const categories = ["travel", "books", "food", "technology", "lifestyle"];

//   useEffect(() => {
//     document.title = "Blog Categories";
//     if (category) {
//       fetchBlogsByCategory(category);
//     }
//   }, [category]);

//   const fetchBlogsByCategory = (selectedCategory) => {
//     setLoading(true);
//     BlogService.getBlogsByCategory(selectedCategory)
//       .then((res) => {
//         setBlogs(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("username");
//     alert("Logged out successfully");
//     navigate("/Home");
//   };

//   const handleCategoryClick = (selectedCategory) => {
//     navigate(`/${selectedCategory}`);
//     fetchBlogsByCategory(selectedCategory);
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <div style={styles.navbar}>
//         <h1 style={styles.logo}>My Blog App</h1>
//         <div style={styles.profileContainer}>
//           <span style={styles.icon} onClick={toggleDropdown}>
//             ☰
//           </span>
//           {isDropdownOpen && (
//             <div style={styles.dropdown}>
//               <button
//                 style={styles.dropdownItem}
//                 onClick={() => navigate("/userProfile")}
//               >
//                 👤 User Profile
//               </button>
//               <button style={styles.dropdownItem} onClick={handleLogout}>
//                 🔓 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Page Layout */}
//       <div style={styles.container}>
//         {/* Sidebar */}
//         <div style={styles.sidebar}>
//           <h2 style={styles.sidebarTitle}>Blog Manager</h2>
//           <nav style={styles.navLinks}>
//             <Link to="/register" style={{ ...styles.link, ...styles.register }}>
//               Register
//             </Link>
//             <Link to="/login" style={{ ...styles.link, ...styles.login }}>
//               Login
//             </Link>
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div style={styles.mainContent}>
//           <div style={styles.card}>
//             <h1 style={styles.heading}>Explore Blog Categories</h1>
//             <form style={styles.formGrid}>
//               {categories.map((cat) => (
//                 <button
//                   type="button"
//                   key={cat}
//                   onClick={() => handleCategoryClick(cat)}
//                   style={styles.categoryButton}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </form>

//             {/* Blogs for selected category */}
//             {category && (
//               <div style={{ marginTop: "3rem" }}>
//                 <h2 style={{ color: "#1f2937" }}>
//                   Blogs in "{category.charAt(0).toUpperCase() + category.slice(1)}"
//                 </h2>
//                 {loading ? (
//                   <p>Loading...</p>
//                 ) : blogs.length ? (
//                   <ul>
//                     {blogs.map((blog) => (
//                       <li key={blog.id}>
//                         <h3>{blog.title}</h3>
//                         <p>{blog.content}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No blogs found.</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Styles remain unchanged
// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "1rem 2rem",
//     backgroundColor: "#1f2937",
//     color: "#fff",
//     position: "relative",
//   },
//   logo: {
//     fontSize: "1.5rem",
//   },
//   profileContainer: {
//     position: "relative",
//   },
//   icon: {
//     fontSize: "1.5rem",
//     cursor: "pointer",
//     userSelect: "none",
//   },
//   dropdown: {
//     position: "absolute",
//     top: "2.5rem",
//     right: 0,
//     backgroundColor: "#fff",
//     border: "1px solid #ccc",
//     borderRadius: "0.5rem",
//     padding: "0.5rem",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   dropdownItem: {
//     display: "block",
//     padding: "0.5rem 1rem",
//     backgroundColor: "#fff",
//     border: "none",
//     width: "100%",
//     textAlign: "left",
//     cursor: "pointer",
//     fontSize: "1rem",
//   },
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     backgroundColor: "#f3f4f6",
//   },
//   sidebar: {
//     width: "16rem",
//     backgroundColor: "#1e3a8a",
//     color: "white",
//     padding: "1.5rem",
//     display: "flex",
//     flexDirection: "column",
//     gap: "1.5rem",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   sidebarTitle: {
//     fontSize: "1.5rem",
//     fontWeight: "600",
//   },
//   navLinks: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//   },
//   link: {
//     padding: "0.5rem 1rem",
//     borderRadius: "0.375rem",
//     textAlign: "center",
//     color: "white",
//     textDecoration: "none",
//     transition: "background-color 0.3s",
//   },
//   register: {
//     backgroundColor: "#2563eb",
//   },
//   login: {
//     backgroundColor: "#16a34a",
//   },
//   mainContent: {
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "2.5rem",
//     background: "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
//   },
//   card: {
//     width: "100%",
//     maxWidth: "64rem",
//     backgroundColor: "white",
//     padding: "2.5rem",
//     borderRadius: "1.5rem",
//     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #e5e7eb",
//   },
//   heading: {
//     fontSize: "2.25rem",
//     fontWeight: "700",
//     marginBottom: "2.5rem",
//     textAlign: "center",
//     color: "#1d4ed8",
//     letterSpacing: "0.05em",
//   },
//   formGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: "1.5rem",
//   },
//   categoryButton: {
//     padding: "1.5rem",
//     backgroundColor: "#e0e7ff",
//     borderRadius: "0.75rem",
//     fontSize: "1.25rem",
//     fontWeight: "600",
//     color: "#3730a3",
//     textTransform: "capitalize",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s, background-color 0.3s",
//     cursor: "pointer",
//   },
// };




















































// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function HomeWithNavbar() {
//   const navigate = useNavigate();
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     document.title = "Blog Categories";
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("username");
//     alert("Logged out successfully");
//     navigate("/Home");
//   };

//   // const categories = ["travel", "books", "food", "technology", "lifestyle"];
//   // const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

//   // const handleCategoryClick = (category) => {
//   //   if (!isAuthenticated) {
//   //     alert("Please register or login to view blog categories.");
//   //     return;
//   //   }
//   //   navigate(`/travel`);
//   // };

// const categories = ["travel", "books", "food", "technology", "lifestyle"];

// const handleCategoryClick = (category) => {
//   navigate(`/${category}`);
// };


//   return (
//     <div>
//       {/* Navbar */}
//       <div style={styles.navbar}>
//         <h1 style={styles.logo}>My Blog App</h1>
//         <div style={styles.profileContainer}>
//           <span style={styles.icon} onClick={toggleDropdown}>
//             ☰
//           </span>
//           {isDropdownOpen && (
//             <div style={styles.dropdown}>
//               <button
//                 style={styles.dropdownItem}
//                 onClick={() => navigate("/userProfile")}
//               >
//                 👤 User Profile
//               </button>
//               <button style={styles.dropdownItem} onClick={handleLogout}>
//                 🔓 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Page Layout */}
//       <div style={styles.container}>
//         {/* Sidebar */}
//         <div style={styles.sidebar}>
//           <h2 style={styles.sidebarTitle}>Blog Manager</h2>
//           <nav style={styles.navLinks}>
//             <Link to="/register" style={{ ...styles.link, ...styles.register }}>
//               Register
//             </Link>
//             <Link to="/login" style={{ ...styles.link, ...styles.login }}>
//               Login
//             </Link>
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div style={styles.mainContent}>
//           <div style={styles.card}>
//             <h1 style={styles.heading}>Explore Blog Categories</h1>
//             <form style={styles.formGrid}>
//               {/* {categories.map((category) => (
//                 <button
//                   type="button"
//                   key={category}
//                   onClick={() => handleCategoryClick(category)}
//                   style={styles.categoryButton}
//                 >
//                   {category}
//                 </button>
//               ))} */}

//   {categories.map((category) => (
//      <button
//         type="button"
//         key={category}
//         onClick={() => handleCategoryClick(category)}
//         style={styles.categoryButton}
//       >
//         {category}
//       </button>
//   ))}


//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Styles
// const styles = {
//   // Navbar styles
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "1rem 2rem",
//     backgroundColor: "#1f2937",
//     color: "#fff",
//     position: "relative",
//   },
//   logo: {
//     fontSize: "1.5rem",
//   },
//   profileContainer: {
//     position: "relative",
//   },
//   icon: {
//     fontSize: "1.5rem",
//     cursor: "pointer",
//     userSelect: "none",
//   },
//   dropdown: {
//     position: "absolute",
//     top: "2.5rem",
//     right: 0,
//     backgroundColor: "#fff",
//     border: "1px solid #ccc",
//     borderRadius: "0.5rem",
//     padding: "0.5rem",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   dropdownItem: {
//     display: "block",
//     padding: "0.5rem 1rem",
//     backgroundColor: "#fff",
//     border: "none",
//     width: "100%",
//     textAlign: "left",
//     cursor: "pointer",
//     fontSize: "1rem",
//   },

//   // Page layout styles
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     backgroundColor: "#f3f4f6",
//   },
//   sidebar: {
//     width: "16rem",
//     backgroundColor: "#1e3a8a",
//     color: "white",
//     padding: "1.5rem",
//     display: "flex",
//     flexDirection: "column",
//     gap: "1.5rem",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   sidebarTitle: {
//     fontSize: "1.5rem",
//     fontWeight: "600",
//   },
//   navLinks: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//   },
//   link: {
//     padding: "0.5rem 1rem",
//     borderRadius: "0.375rem",
//     textAlign: "center",
//     color: "white",
//     textDecoration: "none",
//     transition: "background-color 0.3s",
//   },
//   register: {
//     backgroundColor: "#2563eb",
//   },
//   login: {
//     backgroundColor: "#16a34a",
//   },
//   mainContent: {
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "2.5rem",
//     background: "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
//   },
//   card: {
//     width: "100%",
//     maxWidth: "64rem",
//     backgroundColor: "white",
//     padding: "2.5rem",
//     borderRadius: "1.5rem",
//     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #e5e7eb",
//   },
//   heading: {
//     fontSize: "2.25rem",
//     fontWeight: "700",
//     marginBottom: "2.5rem",
//     textAlign: "center",
//     color: "#1d4ed8",
//     letterSpacing: "0.05em",
//   },
//   formGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: "1.5rem",
//   },
//   categoryButton: {
//     padding: "1.5rem",
//     backgroundColor: "#e0e7ff",
//     borderRadius: "0.75rem",
//     fontSize: "1.25rem",
//     fontWeight: "600",
//     color: "#3730a3",
//     textTransform: "capitalize",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s, background-color 0.3s",
//     cursor: "pointer",
//   },
// };


























































// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isAuthenticated");
//     alert("Logged out successfully");
//     navigate("/login");
//   };

//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
//   const categories = ["travel", "books", "food", "technology", "lifestyle"];

//   const handleCategoryClick = (category) => {
//     if (!isAuthenticated) {
//       alert("Please register or login to view blog categories.");
//       return;
//     }
//     navigate(`/category/${category}`);
//   };

//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         <h2 style={styles.sidebarTitle}>Blog Manager</h2>
//         <nav style={styles.navLinks}>
//           <a href="/register" style={{ ...styles.link, ...styles.register }}>
//             Register
//           </a>
//           <a href="/login" style={{ ...styles.link, ...styles.login }}>
//             Login
//           </a>
//           <a href="/nav" style={{ ...styles.link, ...styles.login }}>
//             userProfile
//           </a>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         <div style={styles.card}>
//           <h1 style={styles.heading}>Explore Blog Categories</h1>
//           <form style={styles.formGrid}>
//             {categories.map((category) => (
//               <button
//                 type="button"
//                 key={category}
//                 onClick={() => handleCategoryClick(category)}
//                 style={styles.categoryButton}
//               >
//                 {category}
//               </button>
//             ))}
//           </form>

//           {/* Profile Icon and Dropdown */}
//           <div style={styles.profileContainer}>
//             <i
//               className="fas fa-user-circle"
//               style={styles.profileIcon}
//               onClick={handleDropdownToggle}
//             ></i>
//             {isDropdownOpen && (
//               <div style={styles.dropdown}>
//                 <button style={styles.dropdownItem} onClick={() => navigate("/profile")}>
//                   User Profile
//                 </button>
//                 <button style={styles.dropdownItem} onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Styles
// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     backgroundColor: "#f3f4f6",
//   },
//   sidebar: {
//     width: "16rem",
//     backgroundColor: "#1e3a8a",
//     color: "white",
//     padding: "1.5rem",
//     display: "flex",
//     flexDirection: "column",
//     gap: "1.5rem",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   sidebarTitle: {
//     fontSize: "1.5rem",
//     fontWeight: "600",
//   },
//   navLinks: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//   },
//   link: {
//     padding: "0.5rem 1rem",
//     borderRadius: "0.375rem",
//     textAlign: "center",
//     color: "white",
//     textDecoration: "none",
//     transition: "background-color 0.3s",
//   },
//   register: {
//     backgroundColor: "#2563eb",
//   },
//   login: {
//     backgroundColor: "#16a34a",
//   },
//   mainContent: {
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "2.5rem",
//     background: "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
//     position: "relative", // Allow absolute positioning within main content
//   },
//   card: {
//     width: "100%",
//     maxWidth: "64rem",
//     backgroundColor: "white",
//     padding: "2.5rem",
//     borderRadius: "1.5rem",
//     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #e5e7eb",
//   },
//   heading: {
//     fontSize: "2.25rem",
//     fontWeight: "700",
//     marginBottom: "2.5rem",
//     textAlign: "center",
//     color: "#1d4ed8",
//     letterSpacing: "0.05em",
//   },
//   formGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: "1.5rem",
//   },
//   categoryButton: {
//     padding: "1.5rem",
//     backgroundColor: "#e0e7ff",
//     borderRadius: "0.75rem",
//     fontSize: "1.25rem",
//     fontWeight: "600",
//     color: "#3730a3",
//     textTransform: "capitalize",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s, background-color 0.3s",
//     cursor: "pointer",
//   },
//   profileContainer: {
//     position: "absolute", // Position the profile icon absolutely within the mainContent
//     top: "20px", // Adjust to desired position from top
//     left: "20px", // Adjust to desired position from left
//     zIndex: 2, // Ensure it's above other content
//   },
//   profileIcon: {
//     fontSize: "2rem",
//     color: "#1e3a8a",
//     cursor: "pointer",
//   },
//   dropdown: {
//     position: "absolute",
//     top: "35px", // Adjust based on the size of the icon
//     left: "0",
//     backgroundColor: "#fff",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//     borderRadius: "5px",
//     width: "200px",
//     zIndex: 1,
//   },
//   dropdownItem: {
//     padding: "10px",
//     backgroundColor: "#f1f1f1",
//     border: "none",
//     textAlign: "left",
//     width: "100%",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
// };







































































// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isAuthenticated");
//     alert("Logged out successfully");
//     navigate("/login");
//   };

//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
//   const categories = ["travel", "books", "food", "technology", "lifestyle"];

//   const handleCategoryClick = (category) => {
//     if (!isAuthenticated) {
//       alert("Please register or login to view blog categories.");
//       return;
//     }
//     navigate(`/category/${category}`);
//   };

//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         <h2 style={styles.sidebarTitle}>Blog Manager</h2>
//         <nav style={styles.navLinks}>
//           <a href="/register" style={{ ...styles.link, ...styles.register }}>
//             Register
//           </a>
//           <a href="/login" style={{ ...styles.link, ...styles.login }}>
//             Login
//           </a>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         <div style={styles.card}>
//           <h1 style={styles.heading}>Explore Blog Categories</h1>
//           <form style={styles.formGrid}>
//             {categories.map((category) => (
//               <button
//                 type="button"
//                 key={category}
//                 onClick={() => handleCategoryClick(category)}
//                 style={styles.categoryButton}
//               >
//                 {category}
//               </button>
//             ))}
//           </form>

//           {/* Profile Icon and Dropdown */}
//           <div style={styles.profileContainer}>
//             <i
//               className="fas fa-user-circle"
//               style={styles.profileIcon}
//               onClick={handleDropdownToggle}
//             ></i>
//             {isDropdownOpen && (
//               <div style={styles.dropdown}>
//                 <button style={styles.dropdownItem} onClick={() => navigate("/profile")}>
//                   User Profile
//                 </button>
//                 <button style={styles.dropdownItem} onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Styles
// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     backgroundColor: "#f3f4f6",
//   },
//   sidebar: {
//     width: "16rem",
//     backgroundColor: "#1e3a8a",
//     color: "white",
//     padding: "1.5rem",
//     display: "flex",
//     flexDirection: "column",
//     gap: "1.5rem",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   sidebarTitle: {
//     fontSize: "1.5rem",
//     fontWeight: "600",
//   },
//   navLinks: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//   },
//   link: {
//     padding: "0.5rem 1rem",
//     borderRadius: "0.375rem",
//     textAlign: "center",
//     color: "white",
//     textDecoration: "none",
//     transition: "background-color 0.3s",
//   },
//   register: {
//     backgroundColor: "#2563eb",
//   },
//   login: {
//     backgroundColor: "#16a34a",
//   },
//   mainContent: {
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "2.5rem",
//     background: "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
//   },
//   card: {
//     width: "100%",
//     maxWidth: "64rem",
//     backgroundColor: "white",
//     padding: "2.5rem",
//     borderRadius: "1.5rem",
//     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #e5e7eb",
//   },
//   heading: {
//     fontSize: "2.25rem",
//     fontWeight: "700",
//     marginBottom: "2.5rem",
//     textAlign: "center",
//     color: "#1d4ed8",
//     letterSpacing: "0.05em",
//   },
//   formGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: "1.5rem",
//   },
//   categoryButton: {
//     padding: "1.5rem",
//     backgroundColor: "#e0e7ff",
//     borderRadius: "0.75rem",
//     fontSize: "1.25rem",
//     fontWeight: "600",
//     color: "#3730a3",
//     textTransform: "capitalize",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s, background-color 0.3s",
//     cursor: "pointer",
//   },
//   profileContainer: {
//     position: "relative",
//     display: "inline-block",
//     marginTop: "20px",
//   },
//   profileIcon: {
//     fontSize: "2rem",
//     color: "#1e3a8a",
//     cursor: "pointer",
//   },
//   dropdown: {
//     position: "absolute",
//     top: "35px",
//     right: "0",
//     backgroundColor: "#fff",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//     borderRadius: "5px",
//     width: "200px",
//     zIndex: 1,
//   },
//   dropdownItem: {
//     padding: "10px",
//     backgroundColor: "#f1f1f1",
//     border: "none",
//     textAlign: "left",
//     width: "100%",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
// };























































































































// import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export default function Home() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.title = "Blog Categories";
//   }, []);

//   const categories = ["travel", "books", "food", "technology", "lifestyle"];

//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

//   const handleCategoryClick = (category) => {
//     if (!isAuthenticated) {
//       alert("Please register or login to view blog categories.");
//       return;
//     }
//     navigate(`/category/${category}`);
//   };

//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         <h2 style={styles.sidebarTitle}>Blog Manager</h2>
//         <nav style={styles.navLinks}>
//           <Link to="/register" style={{ ...styles.link, ...styles.register }}>
//             Register
//           </Link>
//           <Link to="/login" style={{ ...styles.link, ...styles.login }}>
//             Login
//           </Link>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         <div style={styles.card}>
//           <h1 style={styles.heading}>Explore Blog Categories</h1>
//           <form style={styles.formGrid}>
//             {categories.map((category) => (
//               <button
//                 type="button"
//                 key={category}
//                 onClick={() => handleCategoryClick(category)}
//                 style={styles.categoryButton}
//               >
//                 {category}
//               </button>
//             ))}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Same styles as you defined earlier
// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     backgroundColor: "#f3f4f6",
//   },
//   sidebar: {
//     width: "16rem",
//     backgroundColor: "#1e3a8a",
//     color: "white",
//     padding: "1.5rem",
//     display: "flex",
//     flexDirection: "column",
//     gap: "1.5rem",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   sidebarTitle: {
//     fontSize: "1.5rem",
//     fontWeight: "600",
//   },
//   navLinks: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//   },
//   link: {
//     padding: "0.5rem 1rem",
//     borderRadius: "0.375rem",
//     textAlign: "center",
//     color: "white",
//     textDecoration: "none",
//     transition: "background-color 0.3s",
//   },
//   register: {
//     backgroundColor: "#2563eb",
//   },
//   login: {
//     backgroundColor: "#16a34a",
//   },
//   mainContent: {
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "2.5rem",
//     background: "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
//   },
//   card: {
//     width: "100%",
//     maxWidth: "64rem",
//     backgroundColor: "white",
//     padding: "2.5rem",
//     borderRadius: "1.5rem",
//     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #e5e7eb",
//   },
//   heading: {
//     fontSize: "2.25rem",
//     fontWeight: "700",
//     marginBottom: "2.5rem",
//     textAlign: "center",
//     color: "#1d4ed8",
//     letterSpacing: "0.05em",
//   },
//   formGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: "1.5rem",
//   },
//   categoryButton: {
//     padding: "1.5rem",
//     backgroundColor: "#e0e7ff",
//     borderRadius: "0.75rem",
//     fontSize: "1.25rem",
//     fontWeight: "600",
//     color: "#3730a3",
//     textTransform: "capitalize",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s, background-color 0.3s",
//     cursor: "pointer",
//   },
// };



























































