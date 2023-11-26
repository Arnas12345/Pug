import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Alert, AlertTitle } from "@mui/material";

const PostData = () => {
    const [sensorId, setSensorId] = useState();
    const [temperature, setTemperature] = useState();
    const [humidity, setHumidity] = useState();
    const [windSpeed, setWindSpeed] = useState();
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const sensorBody = { sensorId, temperature, humidity, windSpeed };

        fetch("http://localhost:8000/api/sensor-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sensorBody),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Sensor data sent successfully!");
                    setSubmitSuccess(true);
                } else {
                    throw new Error("Error while sending sensor data.");
                }
            })
            .catch((error) => {
                console.error(
                    "There was an error sending the sensor data:",
                    error
                );
            });
    };

    useEffect(() => {
        let timeout;
        if (submitSuccess) {
            timeout = setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);
        }

        return () => clearTimeout(timeout);
    }, [submitSuccess]);

    return (
        <>
            <h4>Post new sensor data</h4>
            {submitSuccess && (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Sensor data submitted successfully!
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <br></br>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                >
                    <Grid item>
                        <TextField
                            label="Sensor Id"
                            type="number"
                            style={{ width: "250px" }}
                            required
                            value={sensorId}
                            onChange={(e) => {
                                setSensorId(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Temperature"
                            type="number"
                            style={{ width: "250px" }}
                            required
                            value={temperature}
                            onChange={(e) => {
                                setTemperature(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Humidity"
                            type="number"
                            style={{ width: "250px" }}
                            required
                            value={humidity}
                            onChange={(e) => {
                                setHumidity(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Windspeed"
                            type="number"
                            style={{ width: "250px" }}
                            required
                            value={windSpeed}
                            onChange={(e) => {
                                setWindSpeed(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default PostData;
