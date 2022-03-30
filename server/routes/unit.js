import express from 'express';
import { getAllUnit,createUnit,getAllUnitLine,assignLine } from '../controllers/unit.js';
const router = express.Router();

// @route   GET api/units
// @desc    Get all units
// @access  Public
router.get("/",getAllUnit);
router.get("/getAllUnitLine",getAllUnitLine);
router.post("/assignLine",assignLine);

router.post("/",createUnit)

export default router;