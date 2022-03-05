const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const User = require("../model/User");

// @route GET api/auth
// @desc verify token
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // Simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hastPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hastPassword,
    });
    await newUser.save();

    // Generate token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
});
// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" });
  }
  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user or password" });
    }
    // Validate password
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user or password" });
    }
    // Generate token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
});

router.get("/", (req, res) => {
  res.send("Hello from Auth");
});

module.exports = router;
