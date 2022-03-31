import express from "express";
import { getQualityByUnit,getQualityUnitBydate } from "../controllers/dashboard.js";
const router = express.Router();
// @ route POST api/dashboard/
router.get("/getQualityByUnit", getQualityByUnit);
router.get("/getQualityUnitBydate/:dateSign", getQualityUnitBydate);


export default router;