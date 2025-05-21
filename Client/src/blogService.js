import axios from 'axios';
const url =`http://localhost:9099/register`
const API_BASE =`http://localhost:9099/`
const blog_url=`http://localhost:9099`
const comment_url =`http://localhost:9099/comment`
class BlogService
{
    getService(){
        return axios.get(`${url}`)
    }
    saveRegisterDetails(registerdetails){
            return axios.post(`${url}`,registerdetails);
        }
    validateUser(username, password) {
            return axios.get(`${url}/${username}/${password}`);
          }

    getBlogsByCategory(category) {
      return axios.get(`${blog_url}/cat/${category}`);
     }
    
    getBlogDetails() {
    return axios.get(`${API_BASE}`);
  }

  postBlogDetails(title, description) {
    return axios.post(`http://localhost:9099/`, { title, description });
  }
  
  updateBlogDetails(id, blogData) {
    return axios.put(`http://localhost:9099/${id}`, blogData);
  }
  
  deleteBlog(id) {
    return axios.delete(`http://localhost:9099/${id}`);
  }
//   getComments(){
//     return axios.get(`${comment_url}`)
// }
// postComments(name, comment) {
//   return axios.post(`${comment_url}`, { name, comment });
// }
getComments(postId) {
  return axios.get(`${comment_url}/${postId}`);  // API endpoint for fetching comments of a post
}

// Post a new comment to a blog post
postComments(name, comment, postId) {
  return axios.post(`${comment_url}/${postId}`, { name, comment });  // API endpoint for posting a comment
}

}
export default new BlogService()