import { Router } from "express";
import {
  addPortsToDeviceHandler,
  createdeviceHandler,
} from "../controller/device.controller";
import { adddeviceToRackHandler } from "../controller/rack.controller";
import { validateResource } from "../middleware/validateResource";
import { createdeviceSchema } from "../schema/device.schema";
import { createPortSchema } from "../schema/port.schema";

const DeviceManagerRouter = Router();

//METHODS

//GET

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
//PATCH
DeviceManagerRouter.patch("/add/device/rack", adddeviceToRackHandler);
//DELETE
export default DeviceManagerRouter;
