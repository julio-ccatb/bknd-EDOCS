import { Request, Response } from "express";
import { createdevice } from "../service/device.service";
import logger from "../utils/logger";

export const createdeviceHandler = async (req: Request, res: Response) => {
  try {
    const device = await createdevice(req.body);
    return res.status(201).send({ device });
  } catch (e: any) {
    logger.error(e.message);
    return res.status(500).send({ e });
  }
};
