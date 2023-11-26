import React, { useState } from "react";
import { Card, CardContent, Button, Grid } from "@mui/material";
import PostData from "./PostData";
import QueryData from "./QueryData";

const WeatherApp = () => {
    const [showPost, setShowPost] = useState(false);
    const [showQuery, setShowQuery] = useState(false);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Card variant="outlined" style={{ minWidth: "25rem" }}>
                <CardContent>
                    <h1>Weather App</h1>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ margin: "10px" }}
                        onClick={() => {
                            setShowPost(true);
                            setShowQuery(false);
                        }}
                    >
                        Post Data
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ margin: "10px" }}
                        onClick={() => {
                            setShowQuery(true);
                            setShowPost(false);
                        }}
                    >
                        Query Data
                    </Button>
                    {showPost && <PostData />}
                    {showQuery && <QueryData />}
                </CardContent>
            </Card>
        </Grid>
    );
};

export default WeatherApp;
