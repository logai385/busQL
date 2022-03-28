import { STATUS_CODE,ROLE } from "../utils/systemSettings.js";

const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = STATUS_CODE;
const { ADMINISTRATOR, OPERATOR } = ROLE;
import User from "../model/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
export const getAllUser = async (req, res) => {
  try {
    const admin = await User.findById(req.userId);

    if (admin && admin.role === ADMINISTRATOR) {
      const role = OPERATOR;
      const users = await User.find({ role: role }).select("-password");
      if (!users)
        return res.status(NOT_FOUND).json({ message: "User not found" });
      res.status(OK).json({ users });
    } else {
      return res.status(UNAUTHORIZED).json({ message: "Access denied" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(NOT_FOUND).json({ message: "User not found" });
    res.status(OK).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(BAD_REQUEST).json({ message: "Please enter all fields" });
  }
  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Incorrect user or password" });
    }
    // Validate password
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Incorrect user or password" });
    }
    // Generate token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(OK).json({
      message: "User logged in successfully",
      accessToken,
    });
  } catch (err) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
export const register = async (req, res) => {
  const { username, password, role } = req.body;
  // Simple validation
  if (!username || !password) {
    return res
      .status(BAD_REQUEST)
      .json({message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(CONFLICT)
        .json({  message: "User already exists" });
    }
    const hastPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hastPassword,
      role: role || "OPERATOR",
    });
    await newUser.save();

    // Generate token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET
    );
    res.status(OK).json({
      message: "User created successfully",
      accessToken,
    });
  } catch (err) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
