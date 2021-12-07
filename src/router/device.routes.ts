import { Router } from "express";
import {
  addPortsToDeviceHandler,
  createdeviceHandler,
} from "../controller/device.controller";
import { adddeviceToRackHandler } from "../controller/rack.controller";
import { validateResource } from "../middleware/validateResource";
import { createdeviceSchema, findDeviceSchema } from "../schema/device.schema";
import {
  createPortSchema,
  connectPortSchema,
  idPortBodySchema,
} from "../schema/port.schema";
import {
  disconnectPortHandler,
  getDevicesHandler,
} from "../controller/device.controller";
import {
  findDeviceHandler,
  connectPortHandler,
} from "../controller/device.controller";
import {
  getDevicePortsHandler,
  findPortHandler,
} from "../controller/device.controller";
import { idPortParamSchema } from "../schema/port.schema";

const DeviceManagerRouter = Router();

//METHODS

//GET

DeviceManagerRouter.get(
  "/device/:device_id",
  validateResource(findDeviceSchema),
  findDeviceHandler
);
DeviceManagerRouter.get("/device/", getDevicesHandler);
DeviceManagerRouter.get(
  "/device/ports/:device_id",
  validateResource(findDeviceSchema),
  getDevicePortsHandler
);
DeviceManagerRouter.get(
  "/ports/:port_id",
  validateResource(idPortParamSchema),
  findPortHandler
);

//POST
DeviceManagerRouter.post(
  "/device",
  validateResource(createdeviceSchema),
  createdeviceHandler
);

DeviceManagerRouter.post(
  "/add/device/ports",
  validateResource(createPortSchema),
  addPortsToDeviceHandler
);

DeviceManagerRouter.post(
  "/device/ports/connect",
  validateResource(connectPortSchema),
  connectPortHandler
);
DeviceManagerRouter.post(
  "/device/ports/disconnect",
  validateResource(idPortBodySchema),
  disconnectPortHandler
);
//PATCH
DeviceManagerRouter.patch("/add/device/rack", adddeviceToRackHandler);
//DELETE
export default DeviceManagerRouter;
