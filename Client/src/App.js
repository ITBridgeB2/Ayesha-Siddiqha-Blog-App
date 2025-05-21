import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./register";
import Login from "./login";
import UserProfile from "./userProfile";
import BlogList from "./blogList";
import EditBlog from "./editBlog";
import TravelBlogPage from "./travel";
import BooksBlogPage from "./book";
import FoodBlogPage from "./food";
import TechnologyBlogPage from "./technology";
import LifestyleBlogPage from "./lifestyle";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/blogList" element={<BlogList />} />
        <Route path="/editBlog/:id" element={<EditBlog />} />

        {/* ✅ Fixed category routes (STATIC not dynamic) */}
        <Route path="/travel" element={<TravelBlogPage />} />
        <Route path="/books" element={<BooksBlogPage />} />
        <Route path="/food" element={<FoodBlogPage />} />
        <Route path="/technology" element={<TechnologyBlogPage />} />
        <Route path="/lifestyle" element={<LifestyleBlogPage />} />
      </Routes>
    </Router>
  );
}

























// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import Register from "./register";
// import Login from "./login";
// import UserProfile from "./userProfile";
// import BlogList from "./blogList";
// import EditBlog from "./editBlog";
// import TravelBlogPage from "./travel";
// import BooksBlogPage from "./book";
// import FoodBlogPage from "./food";
// import TechnologyBlogPage from "./technology";
// import LifestyleBlogPage from "./lifestyle";


// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/userProfile" element={<UserProfile/>}/>
//         <Route path="/blogList" element={<BlogList/>}/>
//         <Route path="/editBlog/:id" element={<EditBlog/>}/>
//         <Route path="/travel" element={<TravelBlogPage/>}/>
//         <Route path="/:book" element={<BooksBlogPage/>}/>
//         <Route path="/:food" element={<FoodBlogPage/>}/>
//         <Route path="/:technology" element={<TechnologyBlogPage/>}/>
//         <Route path="/:lifestyle" element={<LifestyleBlogPage/>}/>
//         {/* other routes */}
//       </Routes>
//     </Router>
//   );
// }

