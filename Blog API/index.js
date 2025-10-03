
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); //Allows server to parse incoming requests with JSON

//Random posts
let posts = [
  { id: 1, title: "Hello World", content: "This is my first blog post!" },
  { id: 2, title: "Express Rocks", content: "Learning Express is fun." },
  { id: 3, title: "Football Q&A", content: "Cristiano Ronaldo or Lionel Messi?" },
  { id: 4, title: "Programming Tip", content: "If it works, do NOT touch it." },
  { id: 5, title: "Betting tip", content: "Greece wins Eurobasket 2025." },
];

//Get all posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

//Get a post with specific id if it exists
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);               // Extract ID
  const post = posts.find(p => p.id === id);       // Find post

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

//Create post
app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) 
    {
        return res.status(400).json({ error: "Title and content are required" });
    }
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

//Update post
app.put("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if(!post)
        return res.status(404).json({error: "This post is not found!"});
    
    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;

    res.json(post);
});

//Delete a post
app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const exists = posts.some(p => p.id === id);

    if (!exists) {
        return res.status(404).json({ error: "Post not found" });
    }

    posts = posts.filter(p => p.id !== id);
    res.json({ message: "Post deleted" });
});

app.listen(port, () => {
    console.log(`Blog API is running at http://localhost:${port}`);
});