import { Router } from 'express';
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from '../controller/session.controller';
import { requireUser } from '../middleware/requireUser';
import { validateResource } from '../middleware/validateResource';
import { createSessionSchema } from '../schema/session.schema';

const SessionRouter = Router();

//METHODS

//GET
SessionRouter.get('/sessions', requireUser, getUserSessionHandler);

//POST
SessionRouter.post(
  '/sessions',
  validateResource(createSessionSchema),
  createSessionHandler
);

//PATCH

//DELETE
SessionRouter.delete('/sessions', requireUser, deleteSessionHandler);

export default SessionRouter;
