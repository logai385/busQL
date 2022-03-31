import express from "express";
import { getQualityByUnit,getQualityUnitBydate,getQualityUnitMonth } from "../controllers/dashboard.js";
const router = express.Router();
// @ route POST api/dashboard/
router.get("/getQualityByUnit", getQualityByUnit);
router.get("/getQualityUnitBydate/:dateSign", getQualityUnitBydate);
router.get("/getQualityUnitMonth/:month/:year", getQualityUnitMonth);


export default router;