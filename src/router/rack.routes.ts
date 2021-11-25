import { Router } from "express";
import { createdeviceHandler } from "../controller/device.controller";
import {
  adddeviceToRackHandler,
  createRackHandler,
} from "../controller/rack.controller";
import { validateResource } from "../middleware/validateResource";
import { createRackSchema } from "../schema/rack.schema";
import { findRackHandler } from "../controller/rack.controller";

const RackManagerRouter = Router();
//METHODS

//GET

RackManagerRouter.get("/rack/:rack_id", findRackHandler);

//POST
RackManagerRouter.post(
  "/rack",
  validateResource(createRackSchema),
  createRackHandler
);

//PATCH

//DELETE

export default RackManagerRouter;
