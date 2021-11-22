import { Request, Response } from "express";
import { omit } from "lodash";
import { createUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import loggger from "../utils/logger";

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
    loggger.info("✅ Endpoint reched succesfully");

    const user = await createUser(req.body);
    return res.status(201).send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    loggger.error(e.message);
    res.status(409).send({ err: e.message });
  }
};
