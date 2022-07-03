const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation } = require("../configs/validation");

// register
router.post("/register", async (req, res) => {
  // validate email
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });

  // check if email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({
      msg: "Email already exists",
    });
  }

  // has password
  const salt = await bcrypt.genSalt(10);
  const hasPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    nama: req.body.nama,
    email: req.body.email,
    password: hasPassword,
  });

  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (err) {
    res.status(400).json({
      status: res.statusCode,
      message: "Gagal membuat user baru",
    });
  }
});

// login
router.post("/login", async (req, res) => {
  // check if email already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      status: res.statusCode,
      msg: "Email Anda tidak terdaftar",
    });
  }

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      status: res.statusCode,
      msg: "Password salah",
    });

  // create and assign token JWT
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header("auth-token", token).json({
    token: token,
  });
});

module.exports = router;
