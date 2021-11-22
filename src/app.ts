import bodyParser from "body-parser";
import express from "express";
import SessionRouter from "./router/session.routes";
import UserRouter from "./router/user.routes";
import logger from "./utils/logger";

const app = express();

// Load Route Files

const UserRoutes = UserRouter;
const SessionRoutes = SessionRouter;

// Load General Midlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.use("/api", [UserRoutes, SessionRoutes]);

export default app;
