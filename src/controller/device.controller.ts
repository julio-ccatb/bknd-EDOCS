import { Request, Response } from "express";
import { connectToDevice } from "../service/device.service";
import {
  addPortsToDevice,
  createdevice,
  getDevice,
} from "../service/device.service";

export const createdeviceHandler = async (req: Request, res: Response) => {
  try {
    const device = await createdevice(req.body);
    return res.status(201).send({ device });
  } catch (e: any) {
    return res.status(500).send({ e });
  }
};

export const findDeviceHandler = async (req: Request, res: Response) => {
  try {
    const device = await getDevice(req.params);
    if (device) return res.status(200).send({ device });
    return res.sendStatus(404);
  } catch (e: any) {
    return res.sendStatus(500);
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

export const connectPortHandler = async (req: Request, res: Response) => {
  try {
    const connection = await connectToDevice(req.body);
    if (connection) return res.status(200).send({ connection });
    return res.sendStatus(401);
  } catch (e: any) {
    return res.sendStatus(500);
  }
};
