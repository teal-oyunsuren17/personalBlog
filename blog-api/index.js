require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { categoryRouter } = require("./routes/categoryController");
const { blogRouter } = require("./routes/blogController");
const { userRouter } = require("./routes/userController");

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/");
  },
  filename: function (req, file, cb) {
    const extentsion = file.originalname.split(".").pop();
    cb(null, `${uuid()}.${extentsion}`);
  },
});

const upload = multer({
  storage: storage,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/uploads", express.static("uploads"));

app.post(
  "/upload-image",
  upload.single("image"),
  async function (req, res, next) {
    const uploadImage = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({
      path: uploadImage.secure_url,
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
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server is running on http://localhost", port);
});
