import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "../", "sensor.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS sensor_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sensorId INTEGER,
      temperature REAL,
      humidity REAL,
      windSpeed REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function insertSensorData(sensorId, temperature, humidity, windSpeed, res) {
  const insertQuery = `
        INSERT INTO sensor_data (sensorId, temperature, humidity, windSpeed)
        VALUES (${sensorId}, ${temperature}, ${humidity}, ${windSpeed})
    `;

  db.run(insertQuery, [], (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert sensor" });
    }
    res.status(201).json({ message: "Sensor data added successfully" });
  });
}

function querySensorData(sensorIds, metrics, statistic, dateRange, res) {
  let query = "SELECT ";
  query += metrics
    .map((metric) => `${statistic}(${metric}) as ${statistic}_${metric}`)
    .join(", ");
  query += ` FROM sensor_data WHERE sensorId IN (${sensorIds})`;
  // query += ` AND timestamp <= datetime(${timestampToCompare})`;

  db.get(query, [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }
    res.status(200).json(row);
  });
}

export { insertSensorData, querySensorData };
