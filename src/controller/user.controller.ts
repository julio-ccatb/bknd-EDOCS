import { Request, Response } from "express";
import { omit } from "lodash";
import { createUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";

/**
 *@name createUserHandler
 * @description Creaate and upload a user to the database
 * @param req
 * @param res
 * @async
 */
export const createUserHandler = async (
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).send(omit(user, "password"));
  } catch (e: any) {
    res.status(409).send({ err: e.message });
  }
};
