import express from "express";
import {
    addSensorDataToDB,
    querySensorDataInDB,
} from "../controllers/sensorController.js";

const router = express.Router();
router.post("/sensor-data", addSensorDataToDB);
router.get("/sensor-data", querySensorDataInDB);

export default router;
