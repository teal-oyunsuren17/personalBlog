const express = require("express");
const { v4: uuidv4, v4 } = require("uuid");
const router = express.Router();
const mongoose = require("mongoose");
const { Blog } = require("./blogModel");

const categorySchema = new mongoose.Schema({
  _id: String,
  name: String,
});

const Category = mongoose.model("Category", categorySchema);

router.get("/", async (req, res) => {
  const list = await Category.find();
  res.json(list);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const one = await Category.findOne({ _id: id });
  res.json(one);
});

router.post("/", async (req, res) => {
  const { title } = req.body;

  await Category.create({
    _id: v4(),
    name: title,
  });
  res.sendStatus(201);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Category.deleteOne({ _id: id }).then(() => {
    res.json({ deletedId: id });
    if (res.statusCode === 200) {
      Blog.deleteMany({ categoryId: id });
    }
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  Category.updateOne({ _id: id }, { name: title }).then(() => {
    res.json({ updatedId: id });
  });
});

module.exports = {
  categoryRouter: router,
};
