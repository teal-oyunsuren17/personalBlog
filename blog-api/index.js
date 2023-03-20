require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const { categoryRouter } = require("./routes/categoryController");
const { blogRouter } = require("./routes/blogController");
const multer = require("multer");
const cloudinary = require("cloudinary");

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

app.get("/upload-image", (req, res) => {
  res.json;
});

app.post(
  "/upload-image",
  upload.single("image"),
  async function (req, res, next) {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({
      success: true,
      file: upload.secure_url,
    });
  }
);

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
