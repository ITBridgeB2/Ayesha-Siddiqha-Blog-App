import cors from 'cors'
import express from 'express'
import mysql from 'mysql2/promise'

var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

let db = ({
    host: "localhost",
    user: "root",
    password: 'root',
    database: 'blog'
});
//get all
app.get("/register", async function (request, response) {    //localhost:9090/visitors
    const query = "SELECT * FROM register"
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute(query);
    return response.json(result);   //all the visitors
})




app.post('/register', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const [result] = await connection.execute(
      `INSERT INTO register (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );

    await connection.end();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
});


    app.get("/register/:username/:password", async function (request, response) {
      const username = request.params.username;
      const password = request.params.password;
      const connection = await mysql.createConnection(db);
    
      const [result] = await connection.execute(
        'SELECT * FROM register WHERE username = ? AND password = ?',
        [username, password]
      );
    
      if (result.length === 0) {
        return response.status(204).json("User not found");
      } else {
        return response.status(200).json(result[0].username); // or any other field like firstName
      }
    });
    //get blogs
    app.get("/", async (req, res) => {
        const connection = await mysql.createConnection(db);
        const [rows] = await connection.execute("SELECT * FROM blog_posts");
        res.json(rows);
      });
      
      // Create blog post
      app.post("/", async (req, res) => {
        const { title, description } = req.body;
        const connection = await mysql.createConnection(db);
        await connection.execute(
          "INSERT INTO blog_posts (title, description) VALUES (?, ?)",
          [title, description]
        );
        res.status(201).json({ message: "Blog created" });
      });
      
      // Update blog post
      app.put("/:id", async (req, res) => {
        const { title, description } = req.body;
        const { id } = req.params;
        const connection = await mysql.createConnection(db);
        await connection.execute(
          "UPDATE blog_posts SET title = ?, description = ? WHERE id = ?",
          [title, description, id]
        );
        res.json({ message: "Blog updated" });
      });
      
      // Delete blog post
      app.delete("/:id", async (req, res) => {
        const { id } = req.params;
        const connection = await mysql.createConnection(db);
        await connection.execute("DELETE FROM blog_posts WHERE id = ?", [id]);
        res.json({ message: "Blog deleted" });
      });
      //blog categories
      app.get("/cat/:category", async (req, res) => {
        const { category } = req.params;
      
        try {
          const connection = await mysql.createConnection(db);
          const [results] = await connection.execute(
            "SELECT id, title, content FROM blogs WHERE category = ?",
            [category]
          );
          res.json(results);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
      //for comments
      // GET all comments for a blog post (async/await style)
app.get("/:comment/:id", async (req, res) => {
  const blogId = req.params.id;

  try {
    const connection = await mysql.createConnection(db);
    const [results] = await connection.execute(
      "SELECT * FROM comments WHERE blog_id = ?",
      [blogId]
    );
    res.json(results);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST a new comment for a blog post (async/await style)
app.post("/:comment/:id", async (req, res) => {
  const blogId = req.params.id;
  const { name, comment } = req.body;

  if (!name || !comment) {
    return res.status(400).json({ error: "Name and comment are required." });
  }

  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute(
      "INSERT INTO comments (blog_id, name, comment) VALUES (?, ?, ?)",
      [blogId, name, comment]
    );
    res.json({ message: "Comment added successfully", commentId: result.insertId });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Database error" });
  }
});

    
app.listen("9099")
console.log("blog app started on 9099 port")