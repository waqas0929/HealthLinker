import "dotenv/config.js";

import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./db/config.js";
import syncDb from "./db/init.js";
import allRoutes from "./routes/allRoutes.js";

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(allRoutes);

connectDB();
syncDb();

app.listen(3005, () => {
  console.log("server started");
});
