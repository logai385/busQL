import express from 'express';
import { getAllUnit,createUnit } from '../controllers/unit.js';
const router = express.Router();

// @route   GET api/units
// @desc    Get all units
// @access  Public
router.get("/",getAllUnit);

router.post("/",createUnit)

export default router;