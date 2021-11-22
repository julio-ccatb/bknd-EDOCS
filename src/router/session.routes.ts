import { Router } from "express";
import { createSessionHandler } from "../controller/session.controller";
import { validateResource } from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";

const SessionRouter = Router();

//METHODS

//GET

//POST
SessionRouter.post(
  "/sessions",
  validateResource(createSessionSchema),
  createSessionHandler
);

//PATCH

//DELETE

export default SessionRouter;
