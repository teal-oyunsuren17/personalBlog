const express = require("express");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");

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

module.exports = {
  Blog,
};
