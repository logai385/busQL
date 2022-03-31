import express from "express";

import verifyToken from "../middleware/auth.js";

import  { getAllUser, verifyUser, login, register, getOperatorLine } from "../controllers/auth.js";
const router = express.Router();

// @route GET api/lines
// @desc Get all lines by user
// @access Private
router.get("/getOperatorLine", getOperatorLine);

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


export default router;