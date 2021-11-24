import { Request, Response } from "express";
import { createDivice } from "../service/divice.service";
import logger from "../utils/logger";

export const createDiviceHandler = async (req: Request, res: Response) => {
  try {
    const divice = await createDivice(req.body);
    return res.status(201).send({ divice });
  } catch (e: any) {
    logger.error(e.message);
    return res.status(500).send({ e });
  }
};
