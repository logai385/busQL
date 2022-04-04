import express from "express";
import {
  getAllUnit,
  createUnit,
  getAllUnitBus,
  assignBus,
  deleteUnit,
  removeBus,
} from "../controllers/unit.js";
const router = express.Router();
import verifyToken from "../middleware/auth.js";

// @route   GET api/units
// @desc    Get all units
// @access  Public
router.get("/", getAllUnit);
router.get("/getAllUnitBus", getAllUnitBus);
router.post("/assignBus", verifyToken, assignBus);
router.post("/removeBus", verifyToken, removeBus);

router.post("/", verifyToken, createUnit);
router.delete("/:id", verifyToken, deleteUnit);

export default router;
