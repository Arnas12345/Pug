import express from "express";
import bodyParser from "body-parser";
import sensorDataRouter from "./routes/sensorDataRouter.js";
import cors from "cors";

const app = express();
const port = 8000;
const api = "/api";

app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(api, sensorDataRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
