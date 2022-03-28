const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const User = require("../model/User");
const { getAllUser, verifyUser, login, register } = require("../controllers/auth");

// @route GET api/auth/users
// @desc verify token
// @access private
router.get("/users", verifyToken, getAllUser);

// @route GET api/auth
// @desc verify token
// @access private
router.get("/verify", verifyToken, verifyUser);

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register",register);
// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", login);


module.exports = router;
