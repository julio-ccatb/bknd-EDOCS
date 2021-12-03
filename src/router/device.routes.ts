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
  idPortSchema,
} from "../schema/port.schema";
import {
  disconnectPortHandler,
  getDevicesHandler,
} from "../controller/device.controller";
import {
  findDeviceHandler,
  connectPortHandler,
} from "../controller/device.controller";
import { getDevicePortsHandler } from "../controller/device.controller";

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
  validateResource(idPortSchema),
  disconnectPortHandler
);
//PATCH
DeviceManagerRouter.patch("/add/device/rack", adddeviceToRackHandler);
//DELETE
export default DeviceManagerRouter;
