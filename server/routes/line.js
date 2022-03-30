import express from "express";
const router = express.Router();

import verifyToken from "../middleware/auth.js";

import { getLineByUser, getAllLine, createLine, updateLine, deleteLine, getLineByKeyword,assignUser } from "../controllers/line.js";


// @route GET api/lines
// @desc Get all lines by user
// @access Private
router.get("/getLineByUser", verifyToken, getLineByUser);

// @route GET api/lines
// @desc Get all lines
// @access Public
router.get("/getLineByKeyword/:keyword", getLineByKeyword);
router.get("/getLineByKeyword/", getLineByKeyword);
// @route GET api/lines
// @desc Get all lines
// @access Public
router.get("/", getAllLine);

// @ route POST api/qlnv/line
// @ desc Create a new line
// @ access Public
router.post("/", createLine);
// @ route POST api/qlnv/line
// @ desc Create a new line
// @ access Public
router.post("/assignUser", assignUser);

// @route PUT api/qlnv/line
// @desc Update a transporter
// @access Public
router.put("/", updateLine);

// @route DELETE api/qlnv/line
// @desc Delete a line
// @access Public
router.delete("/:id", deleteLine);

export default router;
