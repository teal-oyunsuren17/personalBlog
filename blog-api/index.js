const express = require("express");
const cors = require("cors");
const { v4: uuidv4, v4 } = require("uuid");
const mongoose = require("mongoose");
const { categoryRouter } = require("./routes/categoryController");
const { blogRouter } = require("./routes/blogController");

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://teal2022oyunsurenpurevsuren:GMNqs2612i2U1wjN@cluster0.bqab1l0.mongodb.net/blog"
  )
  .then(() => console.log("Connected"));

app.use("/category", categoryRouter);
app.use("/blog", blogRouter);

app.listen(port, () => {
  console.log("Server is running on http://localhost", port);
});
