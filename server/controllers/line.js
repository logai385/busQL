import { STATUS_CODE } from "../utils/systemSettings.js";
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = STATUS_CODE;

import Line from "../model/Line.js";
import User from  "../model/User.js"
export const getLineByKeyword = async (req, res) => {
  try {
    const { keyword } = req.params;
    const condition = {
      $or: [
        { lineNumber: { $regex: keyword } },
        { description: { $regex: keyword } },
      ],
    };
    let lines;
    if (!keyword) lines = await Line.find();
    else lines = await Line.find(condition);

    res.status(OK).json(lines);
  } catch (err) {
    console.error(err.message);
    return res.status(NOT_FOUND).json({ message: err.message });
  }
};
export const getLineByUser = async (req, res) => {
  try {
    // get all line by user
    const lines = await Line.find({ user: req.userId });
    if (!lines)
      return res.status(NO_CONTENT).json({ message: "Line not found" });
    res.status(OK).json(lines);
  } catch (err) {
    console.error(err.message);
    return res.status(NOT_FOUND).json({ message: err.message });
  }
};

export const getAllLine = async (req, res) => {
  try {
    // get all line
    const lines = await Line.find().populate("user unit", ["username", "name"]);
    if (!lines)
      return res.status(NOT_FOUND).json({ message: "Line not found" });
    res.status(OK).json(lines);
  } catch (err) {
    console.error(err.message);
    return res.status(BAD_REQUEST).json({ message: err.message });
  }
};
export const createLine = async (req, res) => {
  try {
    // Simple validation
    const { lineNumber, description, status, user } = req.body;
    // Check if lineNumber already exists
    const lineExists = await Line.findOne({ lineNumber });
    if (lineExists) {
      return res
        .status(CONFLICT)
        .json({ message: "lineNumber already exists" });
    }
    // Create new line
    const newLine = new Line({
      lineNumber: lineNumber,
      description: description,
      status: status,
      user: user,
    });
    await newLine.save();
    res.status(CREATED).json(newLine);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
export const updateLine = async (req, res) => {
  try {
    const { id, lineNumber, description, status, user } = req.body;
    //simple validation

    const lineExists = await Line.findOne({ lineNumber: lineNumber });
    if (lineExists && lineExists.id !== id) {
      return res
        .status(CONFLICT)
        .json({ message: "lineNumber already exists" });
    }
    // Check if lineNumber already exists
    let updateLine = {
      lineNumber: lineNumber,
      description: description,
      status: status,
      user: user,
    };
    updateLine = await Line.findOneAndUpdate({ _id: id }, updateLine, {
      new: true,
    });
    if (!updateLine) {
      return res.status(NOT_FOUND).json({ message: "line not found" });
    }
    return res.status(OK).json(updateLine);
  } catch (error) {
    console.log(error.message);
    return res.status(CONFLICT).json({ message: error.message });
  }
};
export const assignUser=async(req,res)=>{
  const{userId, lineId} = req.body;
  try{
    const line = await Line.findById(lineId)
    if (!line) return res.status(BAD_REQUEST).json({message:"line not found"})
    const user = await User.findById(userId)
    if (!user) return res.status(BAD_REQUEST).json({message:"user not found"})
    line.user = user._id;
    await line.save();
    res.status(OK).json(line);
  }catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
export const deleteLine = async (req, res) => {
  try {
    const { id } = req.params;

    const lineExists = await Line.findById(id);
    if (!lineExists) {
      return res.status(NOT_FOUND).json({ message: "line not found" });
    }
    await Line.findByIdAndDelete(id);
    return res.status(OK).json({ message: "line deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
