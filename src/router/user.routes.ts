import { Router } from 'express';
import {
  createUserHandler,
  getCurrentUser,
} from '../controller/user.controller';
import { validateResource } from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { requireUser } from '../middleware/requireUser';

const UserRouter = Router();

//METHODS

//GET

UserRouter.get('/me', requireUser, getCurrentUser);

//POST
UserRouter.post(
  '/users',
  validateResource(createUserSchema),
  createUserHandler
);

//PATCH

//DELETE

export default UserRouter;
