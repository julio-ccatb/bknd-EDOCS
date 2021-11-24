import { Request, Response } from "express";
import { createRack } from "../service/rack.service";
import logger from "../utils/logger";

export const createRackHandler = async (req: Request, res: Response) => {
  try {
    const rack = await createRack(req.body);
    return res.status(201).send({ rack });
  } catch (e: any) {
    logger.error(e.message);
    return res.status(500).send({ e });
  }
};
