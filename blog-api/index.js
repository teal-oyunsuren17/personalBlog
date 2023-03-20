const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const { categoryRouter } = require("./routes/categoryController");
const { blogRouter } = require("./routes/blogController");
const multer = require("multer");

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extentsion = file.originalname.split(".").pop();
    cb(null, `${uuid()}.${extentsion}`);
  },
});

const upload = multer({
  storage: storage,
});

app.use("/uploads", express.static("uploads"));

app.post("/upload-image", upload.single("image"), function (req, res, next) {
  res.json([req.file.path]);
});

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
