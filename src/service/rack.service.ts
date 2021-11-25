import { Omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import { IdeviceToRack } from "../interface/rack.interface";
import deviceModel from "../models/device.model";
import RackModel, { RackDocument } from "../models/rack.model";

export const createRack = async (
  input: Omit<DocumentDefinition<RackDocument>, "createdAt" | "updatedAt">
) => {
  try {
    const rack = await RackModel.create(input);
    return rack.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const adddeviceToRack = async (input: IdeviceToRack) => {
  let rack = await RackModel.findById(input.rack_id);
  let device = await deviceModel.findOne({
    _id: input.device_id,
  });

  if (!rack || !device) {
    throw new Error(`
  ${!rack ? "invalid rack id" : ""}
  ${!device ? "invalid device id" : ""}
  `);
  }

  device.rack = rack._id;

  const saveddevice = await (await device.save()).populate("rack");
  console.log(saveddevice);
  if (saveddevice) return true;
};
