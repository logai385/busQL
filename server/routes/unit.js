import express from "express";
import {
  getAllUnit,
  createUnit,
  getAllUnitLine,
  assignLine,
  deleteUnit,
  removeLine,
} from "../controllers/unit.js";
const router = express.Router();
import verifyToken from "../middleware/auth.js";

// @route   GET api/units
// @desc    Get all units
// @access  Public
router.get("/", getAllUnit);
router.get("/getAllUnitLine", getAllUnitLine);
router.post("/assignLine", verifyToken, assignLine);
router.post("/removeLine", verifyToken, removeLine);

router.post("/", verifyToken, createUnit);
router.delete("/:id", verifyToken, deleteUnit);

export default router;
