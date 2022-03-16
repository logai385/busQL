const express = require("express");
const router = express.Router();
const line = require("../model/Line");
const verifyTonken = require("../middleware/auth");

// @route GET api/lines
// @desc Get all lines by user
// @access Private

router.get("/getLineByUser",verifyTonken, async (req, res) => {
  try {
    // get all line
    const lines = await line.find({user:req.userId});
    if (!lines)
      return res.status(400).json({ success: false, message: "Line not found" });
    res.json({ success: true, lines });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
});

// @route GET api/lines
// @desc Get all lines
// @access Public

router.get("/", async (req, res) => {
  try {
    // get all line
    const lines = await line.find();
    res.json({ success: true, lines });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
});

// @ route POST api/qlnv/line
// @ desc Create a new line
// @ access Public
router.post("/", async (req, res) => {
  try {
    // Simple validation
    const { lineNumber, description, status, user } = req.body;
    if (!lineNumber || lineNumber < 1) {
      return res
        .status(400)
        .json({ success: false, message: "lineNumber must be greater than 0" });
    }
    // Check if lineNumber already exists
    const lineExists = await line.findOne({ lineNumber });
    if (lineExists) {
      return res
        .status(400)
        .json({ success: false, message: "lineNumber already exists" });
    }
    // Create new line
    const newLine = new line({
      lineNumber: lineNumber,
      description: description,
      status: status,
      user:user
    });
    await newLine.save();
    res.json({ success: true, message: "line created", newLine });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
});

// @route PUT api/qlnv/line
// @desc Update a transporter
// @access Public
router.put("/", async (req, res) => {
  try {
    const { id, lineNumber, description, status,user } = req.body;
    //simple validation
    if (!lineNumber || lineNumber < 1) {
      return res
        .status(400)
        .json({ success: false, message: "lineNumber must be greater than 0" });
    }
    const lineExists = await line.findOne({ lineNumber: lineNumber });
    if(lineExists && lineExists.id !== id) {
        return res.status(400).json({ success: false, message: "lineNumber already exists" });
    }
    // Check if lineNumber already exists
    let updateLine = {
      lineNumber: lineNumber,
      description: description,
      status: status,
      user:user
    };
    updateLine = await line.findOneAndUpdate({ _id: id }, updateLine, {
      new: true,
    });
    if (!updateLine) {
      return res
        .status(400)
        .json({ success: false, message: "line not found" });
    }
    return res.json({ success: true, message: "line updated", updateLine });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
});
// @route DELETE api/qlnv/line
// @desc Delete a line
// @access Public
router.delete("/:id", async (req, res) => {
    try {
     const {id} = req.params;   
     
    const lineExists = await line.findById(id);
    if(!lineExists) {
        return res.status(400).json({ success: false, message: "line not found" });
    }
    await line.findByIdAndDelete(id);
    return res.json({ success: true, message: "line deleted" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "server error" });
    }          
});
module.exports = router;
