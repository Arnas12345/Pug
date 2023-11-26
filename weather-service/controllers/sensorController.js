import { insertSensorData, querySensorData } from "../models/SensorData.js";
import { parseQueryParams } from "./sensorController-helper-query.js";
import { parsePostBody, bodyIsValid } from "./sensorController-helper-post.js";

function addSensorDataToDB(req, res) {
  const { sensorId, temperature, humidity, windSpeed } = parsePostBody(
    req.body
  );

  if (!bodyIsValid(sensorId, temperature, humidity, windSpeed)) {
    return res.status(400).json({ error: "Sensor body params are invalid" });
  }

  insertSensorData(sensorId, temperature, humidity, windSpeed, res);
}

function querySensorDataInDB(req, res) {
  const { sensorIds, metrics, statistic, dateRange } = parseQueryParams(
    req.query
  );

  querySensorData(sensorIds, metrics, statistic, dateRange, res);
}

export { addSensorDataToDB, querySensorDataInDB };
