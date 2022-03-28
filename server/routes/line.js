import express from "express";
const router = express.Router();

import verifyTonken from "../middleware/auth.js";

import { getLineByUser, getAllLine, createLine, updateLine, deleteLine } from "../controllers/line.js";

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

export default router;
