import { STATUS_CODE } from "../utils/systemSettings.js";
const { NO_CONTENT, OK, NOT_FOUND, BAD_REQUEST,CONFLICT,CREATED, INTERNAL_SERVER_ERROR } = STATUS_CODE;

import  line from "../model/Line.js";
export const getLineByUser = async (req, res) => {
  try {
    // get all line by user
    const lines = await line.find({ user: req.userId });
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
    const lines = await line.find().populate("user", ["username"]);
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
    const lineExists = await line.findOne({ lineNumber });
    if (lineExists) {
      return res.status(CONFLICT).json({ message: "lineNumber already exists" });
    }
    // Create new line
    const newLine = new line({
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
 
    const lineExists = await line.findOne({ lineNumber: lineNumber });
    if (lineExists && lineExists.id !== id) {
      return res
        .status(CONFLICT)
        .json({message: "lineNumber already exists" });
    }
    // Check if lineNumber already exists
    let updateLine = {
      lineNumber: lineNumber,
      description: description,
      status: status,
      user: user,
    };
    updateLine = await line.findOneAndUpdate({ _id: id }, updateLine, {
      new: true,
    });
    if (!updateLine) {
      return res
        .status(NOT_FOUND)
        .json({message: "line not found" });
    }
    return res.status(CREATED).json(updateLine);
  } catch (error) {
    console.log(error.message);
    return res.status(CONFLICT).json({message: error.message });
  }
};

export const deleteLine = async (req, res) => {
  try {
    const { id } = req.params;

    const lineExists = await line.findById(id);
    if (!lineExists) {
      return res
        .status(NOT_FOUND)
        .json({message: "line not found" });
    }
    await line.findByIdAndDelete(id);
    return res.status(OK).json({message: "line deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({message: error.message });
  }
};
