import { Request, Response } from "express";
import { createUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import loggger from "../utils/logger";

/**
 *
 * @param req
 * @param res
 * @description Creaate and upload a user to the database
 * @async
 */
export const createUserHandler = async (
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) => {
  try {
    loggger.info("✅ Endpoint reched succesfully");

    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (e: any) {
    loggger.error(e.message);
    res.status(409).send({ err: e.message });
  }
};
