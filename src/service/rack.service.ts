import { Omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import { IdeviceToRack, IRackId } from "../interface/rack.interface";
import DeviceModel from "../models/device.model";
import RackModel, { RackDocument } from "../models/rack.model";
import { deviceDocument } from "../models/device.model";

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
  let device = await DeviceModel.findOne({
    _id: input.device_id,
  });

  if (!rack || !device) {
    throw new Error(`
  ${!rack ? "invalid rack id" : ""}
  ${!device ? "invalid device id" : ""}
  `);
  }

  device.rack_id = rack._id;

  const saveddevice = await (await device.save()).populate("rack");
  console.log(saveddevice);
  if (saveddevice) return true;
};

export const findRack = async (query: FilterQuery<deviceDocument>) => {
  const rack = await RackModel.findOne({ _id: query.rack_id }).lean();
  const devices = await DeviceModel.find({ query }).lean();

  return { rack, devices };
};

export const getAllRacks = async () => {
  const racks = await RackModel.find();
  return racks;
};
