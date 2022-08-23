import express from "express";
import {
  getQualityByUnit,
  getQualityTransporterBydate,
  getQualityLineMonth,
  getQualityLineBydate,
  getQualityUnitBydate,
  getQualityAllLineByDate,
} from "../controllers/dashboard.js";
const router = express.Router();
// @ route POST api/dashboard/
router.get("/getQualityByUnit", getQualityByUnit);
router.get("/getQualityLineMonth/:month/:year", getQualityLineMonth);
router.get(
  "/getQualityAllLineByDate/:startDate/:endDate",
  getQualityAllLineByDate
);
router.get(
  "/getQualityTransporterBydate/:bus/:startDate/:endDate",
  getQualityTransporterBydate
);
router.get(
  "/getQualityLineBydate/:line/:startDate/:endDate",
  getQualityLineBydate
);
router.get(
  "/getQualityUnitBydate/:unit/:startDate/:endDate",
  getQualityUnitBydate
);

export default router;
