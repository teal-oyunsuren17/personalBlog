const express = require("express");
const { v4: uuid } = require("uuid");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");

const blogSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuid() },
  title: String,
  picture: {
    path: String,
  },
  categoryId: { type: String, ref: "Category" },
  text: String,
});

const Blog = mongoose.model("Blog", blogSchema);

router.get("/", async (req, res) => {
  const list = await Blog.find({}).populate("categoryId");
  res.json({
    list: list,
    count: 3,
  });
});

router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  const Blogs = await Blog.find({ categoryId: categoryId });
  res.json(Blogs);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const one = await Blog.findOne({ _id: id }).populate("categoryId");
  res.json(one);
});

router.post("/", async (req, res) => {
  const { title, picture, categoryId, text } = req.body;

  await Blog.create({
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
  const { title, picture, categoryId, text } = req.body;

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
