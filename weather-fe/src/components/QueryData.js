import React, { useState } from "react";
import { TextField, Button, Grid, CardContent, Card } from "@mui/material";

const QueryData = () => {
  const [sensorIds, setSensorIds] = useState();
  const [metrics, setMetrics] = useState();
  const [statistic, setStatistic] = useState();
  const [dateRange, setDateRange] = useState();
  const [data, setData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const sensorBody = { sensorIds, metrics, statistic, dateRange };
    const queryParams = new URLSearchParams(sensorBody).toString();

    fetch(`http://localhost:8000/api/sensor-data?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Sensor data sent successfully!");
          return response.json();
        } else {
          throw new Error("Error while sending sensor data.");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("There was an error sending the sensor data:", error);
      });
  };

  return (
    <>
      <h4>Query sensor data</h4>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <TextField
              label="Sensor Ids (comma-separated numbers)"
              type="text"
              style={{ width: "250px" }}
              required
              value={sensorIds}
              onChange={(e) => {
                setSensorIds(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Metrics (comma-seperated metrics)"
              type="text"
              style={{ width: "250px" }}
              required
              value={metrics}
              onChange={(e) => {
                setMetrics(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Statistic"
              type="text"
              style={{ width: "250px" }}
              required
              value={statistic}
              onChange={(e) => {
                setStatistic(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Date Range"
              type="number"
              style={{ width: "250px" }}
              required
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {data && (
        <>
          <h4>Queried Data</h4>
          <Card>
            <CardContent>
              {Object.entries(data)?.map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default QueryData;
