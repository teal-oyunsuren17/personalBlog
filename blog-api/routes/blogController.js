const express = require("express");
const { v4: uuid } = require("uuid");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const { Category } = require("./categoryController");

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
  const { page, size } = req.query;
  const list = await Blog.find({ categoryId: { $ne: null } }, null, {
    limit: size,
    skip: (Number(page) - 1) * Number(size) + 1,
  }).populate("categoryId");

  // const count = await Blog.count({ categoryId: { $nin: categoriesList } });
  const count = await Blog.count({ categoryId: { $ne: null } });

  // const filteredList = await Blog.aggregate([
  //   {
  //     $lookup: {
  //       from: "categories",
  //       localField: "categoryId",
  //       foreignField: "_id",
  //       as: "category",
  //     },
  //   },
  //   { $match: { category: { $ne: [] } } },
  //   { $skip: Number(page - 1) * Number(size) },
  //   { $limit: Number(size) },
  // ]);
  // res.json({
  //   list: filteredList,
  //   count: list.length / size,
  // });
  // const filteredList = list.filter((list) => list.categoryId !== null);

  // const slicedList = filteredList.slice(
  //   page - 1,
  //   Number(page) - 1 + Number(size)
  // );

  res.json({
    list: list,
    count: count,
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
