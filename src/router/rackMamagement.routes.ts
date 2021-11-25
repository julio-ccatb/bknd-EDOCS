import { Router } from "express";
import { createdeviceHandler } from "../controller/device.controller";
import {
  adddeviceToRackHandler,
  createRackHandler,
} from "../controller/rack.controller";
import { validateResource } from "../middleware/validateResource";
import { createdeviceSchema } from "../schema/device.schema";
import { createRackSchema } from "../schema/rack.schema";

const RackManagerRouter = Router();

//METHODS

//GET
//POST
RackManagerRouter.post(
  "/rack",
  validateResource(createRackSchema),
  createRackHandler
);

RackManagerRouter.post(
  "/device",
  validateResource(createdeviceSchema),
  createdeviceHandler
);
//PATCH

RackManagerRouter.patch("/rack/device", adddeviceToRackHandler);

//DELETE

export default RackManagerRouter;
