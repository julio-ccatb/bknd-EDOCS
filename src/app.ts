import express from "express";
import { deserializeUser } from "./middleware/deserializeUser";
import DeviceManagerRouter from "./router/device.routes";
import RackManagerRouter from "./router/rack.routes";
import SessionRouter from "./router/session.routes";
import UserRouter from "./router/user.routes";

const app = express();

// Load Route Files

const UserRoutes = UserRouter;
const SessionRoutes = SessionRouter;
const RackManageRoutes = RackManagerRouter;
const DeviceManageRoutes = DeviceManagerRouter;

// Load General Midlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(deserializeUser);

// Routes

app.use("/api", [
  UserRoutes,
  SessionRoutes,
  RackManageRoutes,
  DeviceManageRoutes,
]);

export default app;
