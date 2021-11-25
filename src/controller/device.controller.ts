import { Request, Response } from "express";
import { addPortsToDevice, createdevice } from "../service/device.service";

export const createdeviceHandler = async (req: Request, res: Response) => {
  try {
    const device = await createdevice(req.body);
    return res.status(201).send({ device });
  } catch (e: any) {
    return res.status(500).send({ e });
  }
};

export const addPortsToDeviceHandler = async (req: Request, res: Response) => {
  try {
    const ports = await addPortsToDevice(req.body);
    if (ports) return res.status(201).send({ ports });
    throw new Error("no ports added");
  } catch (e: any) {
    return res.status(500).send({ e });
  }
};
