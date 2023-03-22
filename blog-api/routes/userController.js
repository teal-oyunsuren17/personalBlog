const express = require("express");
const { v4: uuid } = require("uuid");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = mongoose.model("User", {
  _id: { type: String, default: () => uuid() },
  username: {
    type: String,
    required: [true, "Hereglegchiin neree oruulna uu"],
    unique: [true, "Iim nertei hereglegch burtgegdsen baina"],
  },
  password: {
    type: String,
    required: [true, "Nuuts ugee oruulna uu"],
  },
  role: String,
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  if (!username) {
    res.status(400).json({ message: "Hereglegchiin neree oruulna uu" });
  }

  if (!password) {
    res.status(400).json({ message: "Nuuts ugee oruulna uu" });
  }

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    const result = await newUser.save();
    res.sendStatus(201);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const one = await User.findOne({ username });

  if (one) {
    const auth = bcrypt.compareSync(password, one.password);
    if (auth) {
      res.json({ token: uuid() });
    } else {
      res.status(400).json({ message: "Buruu baina" });
    }
  } else {
    res.status(400).json({ message: "Buruu baina" });
  }
});

module.exports = {
  userRouter: router,
};
