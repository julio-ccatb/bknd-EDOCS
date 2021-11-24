import express from "express";
import { deserializeUser } from "./middleware/deserializeUser";
import RackManagerRouter from "./router/rackMamagement.routes";
import SessionRouter from "./router/session.routes";
import UserRouter from "./router/user.routes";

const app = express();

// Load Route Files

const UserRoutes = UserRouter;
const SessionRoutes = SessionRouter;
const RackManageRoutes = RackManagerRouter;

// Load General Midlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(deserializeUser);

// Routes

app.use("/api", [UserRoutes, SessionRoutes, RackManageRoutes]);

export default app;
