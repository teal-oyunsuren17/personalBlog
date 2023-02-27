const express = require("express");
const cors = require("cors");
const { v4: uuidv4, v4 } = require("uuid");
const fs = require("fs");
// const bcrypt = require("bcryptjs");

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

const user = {
  username: "Horolmaa",
  password: "balgan",
};
let userTokens = [];

app.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (user.username === username && user.password === password) {
    const token = v4();
    userTokens.push(token);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

function readCategory() {
  const content = fs.readFileSync("category.json");
  const category = JSON.parse(content);
  return category;
}

app.get("/category", (req, res) => {
  const { q, token } = req.query;
  if (!userTokens.includes(token)) {
    res.sendStatus(401);
  }
  const category = readCategory();
  res.json(category);
});

app.get("/category/:id", (req, res) => {
  const { id } = req.params;
  const category = readCategory();
  const one = category.find((category) => category.id === id);
  if (one) {
    res.json(one);
  } else {
    res.sendStatus(404);
  }
});

app.post("/category", (req, res) => {
  const { title } = req.body;
  const newCategory = { id: v4(), title };
  const category = readCategory();
  category.unshift(newCategory);
  fs.writeFileSync("category.json", JSON.stringify(category));
  res.sendStatus(201);
});

app.delete("/category/:id", (req, res) => {
  const { id } = req.params;
  let category = readCategory();
  const one = category.find((category) => category.id === id);
  if (one) {
    const newCategory = category.filter((category) => category.id !== id);
    fs.writeFileSync("category.json", JSON.stringify(newCategory));
    category = newCategory;
    res.json({ deletedId: id });
  } else {
    res.sendStatus(404);
  }
});

app.put("/category/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const category = readCategory();

  const index = category.findIndex((category) => category.id === id);
  if (index > -1) {
    category[index].title = title;
    fs.writeFileSync("category.json", JSON.stringify(category));
    res.json({ updatedId: id });
  } else {
    res.sendStatus(404);
  }
});

// ----------------------------------------------------------- //
function readBlog() {
  const content = fs.readFileSync("blog.json");
  const blog = JSON.parse(content);
  return blog;
}

app.get("/blog", (req, res) => {
  const blog = readBlog();
  const page = blog.slice(0, 5);
  res.json(page);
});

app.get("/blog2/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  const blog = readBlog();
  const filteredBlog = blog.filter((blog) => blog.categoryId === categoryId);

  if (filteredBlog) {
    res.json(filteredBlog);
  } else {
    res.sendStatus(404);
  }
});

app.get("/blog/:id", (req, res) => {
  const { id } = req.params;
  const blog = readBlog();
  const one = blog.find((blog) => blog.id === id);

  const categories = readCategory();
  const category = categories.find(
    (category) => category.id === one.categoryId
  );
  one.category = category;
  if (one) {
    res.json(one);
  } else {
    res.sendStatus(404);
  }
});

app.post("/blog", (req, res) => {
  const { title } = req.body;
  const { picture } = req.body;
  const { categoryId } = req.body;
  const { text } = req.body;
  const newBlog = { id: v4(), title, categoryId, text, picture };
  const blog = readBlog();
  blog.unshift(newBlog);
  fs.writeFileSync("blog.json", JSON.stringify(blog));
  res.sendStatus(201);
});

app.delete("/blog/:id", (req, res) => {
  const { id } = req.params;
  console.log(req);
  let blog = readBlog();
  const one = blog.find((blog) => blog.id === id);
  if (one) {
    const newBlog = blog.filter((blog) => blog.id !== id);
    fs.writeFileSync("blog.json", JSON.stringify(newBlog));
    blog = newBlog;
    res.json({ deletedId: id });
  } else {
    res.sendStatus(404);
  }
});

app.put("/blog/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { categoryId } = req.body;
  const { text } = req.body;
  const { picture } = req.body;
  const blog = readBlog();

  const index = blog.findIndex((blog) => blog.id === id);
  if (index > -1) {
    blog[index].title = title;
    blog[index].categoryId = categoryId;
    blog[index].text = text;
    blog[index].picture = picture;
    fs.writeFileSync("blog.json", JSON.stringify(blog));
    res.json({ updatedId: id });
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log("Server is running on http://localhost", port);
});
