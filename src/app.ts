import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { deserializeUser } from './middleware/deserializeUser';
import DeviceManagerRouter from './router/device.routes';
import RackManagerRouter from './router/rack.routes';
import SessionRouter from './router/session.routes';
import UserRouter from './router/user.routes';
import config from '../config/default';

const app = express();

// Load Route Files

const UserRoutes = UserRouter;
const SessionRoutes = SessionRouter;
const RackManageRoutes = RackManagerRouter;
const DeviceManageRoutes = DeviceManagerRouter;

// Load General Midlewares
app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(deserializeUser);

// Routes

app.use('/api', [
  UserRoutes,
  SessionRoutes,
  RackManageRoutes,
  DeviceManageRoutes,
]);

export default app;
