import express from "express";
const router = express.Router();

import { getAllTransporter, getTransporterByLine, createTranporter, deleteTransporter, updateTransporter } from "../controllers/transporter.js";

// @route GET api/transporters
// @desc Get all transporters
// @access Public
router.get("/getByLine/:lineId", getTransporterByLine);
// @route GET api/transporters
// @desc Get all transporters
// @access Public
router.get("/", getAllTransporter);
// @route POST api/transporters
// @desc Create a new transporter
// @access Public
router.post("/", createTranporter);

//@route Delete api/transporters/plate/:plate
//@desc Delete a transporter
//@access Public
router.delete("/:id",deleteTransporter);
//@route PUT api/transporters
//@desc Update a transporter
//@access Public
router.put("/", updateTransporter);

export default router;