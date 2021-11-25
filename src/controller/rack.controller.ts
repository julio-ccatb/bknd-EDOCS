import { Request, Response } from "express";
import { adddeviceToRack, createRack } from "../service/rack.service";
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

export const adddeviceToRackHandler = async (req: Request, res: Response) => {
  try {
    const success = await adddeviceToRack(req.body);
    if (success) return res.sendStatus(200);
    return res.sendStatus(406);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e);
  }
};
