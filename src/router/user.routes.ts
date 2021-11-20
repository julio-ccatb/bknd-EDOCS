import { Router } from "express";
import { createUserHandler } from "../controller/user.controller";
import { validateResource } from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const UserRouter = Router();

//METHODS

//GET

//POST
UserRouter.post(
  "/users",
  validateResource(createUserSchema),
  createUserHandler
);

//PATCH

//DELETE

export default UserRouter;
