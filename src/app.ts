import bodyParser from "body-parser";
import express from "express";
import logger from "./utils/logger";

const app = express();

// Load Route Files

// Load General Midlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.use("/api", () => {
  logger.info("Routes Loaded correctly");
});

export default app;
