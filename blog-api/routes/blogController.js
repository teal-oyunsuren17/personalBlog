const express = require("express");
const { v4: uuidv4, v4 } = require("uuid");
const router = express.Router();
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  _id: String,
  title: String,
  picture: String,
  categoryId: String,
  text: String,
});

const Blog = mongoose.model("Blog", blogSchema);

router.get("/", async (req, res) => {
  const list = await Blog.find();
  res.json(list);
});

router.get("/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  const oneBlog = await Blog.find({ categoryId: categoryId });
  res.json(oneBlog);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const one = await Blog.findOne({ _id: id });
  res.json(one);
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  const { picture } = req.body;
  const { categoryId } = req.body;
  const { text } = req.body;

  await Blog.create({
    _id: v4(),
    title: title,
    picture: picture,
    categoryId: categoryId,
    text: text,
  });
  res.sendStatus(201);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Blog.deleteOne({ _id: id }).then(() => {
    res.json({ deletedId: id });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { categoryId } = req.body;
  const { text } = req.body;
  const { picture } = req.body;

  Blog.updateOne(
    { _id: id },
    {
      title: title,
      picture: picture,
      categoryId: categoryId,
      text: text,
    }
  ).then(() => {
    res.json({ updatedId: id });
  });
});

module.exports = {
  blogRouter: router,
};
