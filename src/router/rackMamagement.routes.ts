import { Router } from "express";
import { createDiviceHandler } from "../controller/divice.controller";
import { createRackHandler } from "../controller/rack.controller";
import { validateResource } from "../middleware/validateResource";
import { createDiviceSchema } from "../schema/divice.schema";
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
  "/divice",
  validateResource(createDiviceSchema),
  createDiviceHandler
);
//PATCH
//DELETE

export default RackManagerRouter;
