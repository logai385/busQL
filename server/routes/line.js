const express = require("express");
const router = express.Router();

const verifyTonken = require("../middleware/auth");

const { getLineByUser, getAllLine, createLine, updateLine, deleteLine } = require("../controllers/line");

// @route GET api/lines
// @desc Get all lines by user
// @access Private
router.get("/getLineByUser", verifyTonken, getLineByUser);

// @route GET api/lines
// @desc Get all lines
// @access Public
router.get("/", getAllLine);

// @ route POST api/qlnv/line
// @ desc Create a new line
// @ access Public
router.post("/", createLine);

// @route PUT api/qlnv/line
// @desc Update a transporter
// @access Public
router.put("/", updateLine);

// @route DELETE api/qlnv/line
// @desc Delete a line
// @access Public
router.delete("/:id", deleteLine);

module.exports = router;
