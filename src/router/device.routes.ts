import { Router } from "express";
import {
  addPortsToDeviceHandler,
  createdeviceHandler,
} from "../controller/device.controller";
import { adddeviceToRackHandler } from "../controller/rack.controller";
import { validateResource } from "../middleware/validateResource";
import { createdeviceSchema, findDeviceSchema } from "../schema/device.schema";
import { createPortSchema, connectPortSchema } from "../schema/port.schema";
import {
  findDeviceHandler,
  connectPortHandler,
} from "../controller/device.controller";

const DeviceManagerRouter = Router();

//METHODS

//GET

DeviceManagerRouter.get(
  "/device/:device_id",
  validateResource(findDeviceSchema),
  findDeviceHandler
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
  "/device/ports",
  validateResource(connectPortSchema),
  connectPortHandler
);
//PATCH
DeviceManagerRouter.patch("/add/device/rack", adddeviceToRackHandler);
//DELETE
export default DeviceManagerRouter;
