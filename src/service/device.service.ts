import { DocumentDefinition, FilterQuery } from "mongoose";
import DeviceModel, { deviceDocument } from "../models/device.model";
import PortModel, { PortDocument } from "../models/port.model";
import { IaddPortToDevice } from "../interface/rack.interface";
import { IdeviceId } from "../interface/device.interface";
import { connectPortInput } from "../schema/port.schema";

export const createdevice = async (
  input: DocumentDefinition<deviceDocument>
) => {
  try {
    const device = await DeviceModel.create(input);

    return device.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const addPortsToDevice = async (input: IaddPortToDevice) => {
  let ports: PortDocument[] = [];

  for (let port_num = 1; port_num <= input.num; port_num++) {
    let port = {
      interface: input.interface,
      port_num,
      device_id: input.device_id,
    } as PortDocument;

    ports.push(port);
  }
  const savedPorts = await PortModel.insertMany(ports);

  return savedPorts;
};
export const getDevice = async (query: FilterQuery<IdeviceId>) => {
  try {
    const device = await DeviceModel.find({ _id: query.device_id });
    return device;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const connectToDevice = async (query: FilterQuery<connectPortInput>) => {
  const { port_id, device_id, target_port_id, target_device_id } = query;

  if (!port_id || !device_id || !target_port_id || !target_device_id)
    return false;

  try {
    let primary_port = await PortModel.findOne({
      _id: port_id,
      device_id: device_id,
    });
    let secondary_port = await PortModel.findOne({
      _id: target_port_id,
      device_id: target_device_id,
    });
    console.log({ primary_port, secondary_port });

    if (!primary_port || !secondary_port) return false;

    primary_port.config.target_device = target_device_id as string;
    primary_port.config.target_port = target_port_id as string;

    secondary_port.config.target_device = device_id as string;
    secondary_port.config.target_port = port_id as string;

    await primary_port.save();
    await secondary_port.save();
    console.log({ primary_port, secondary_port });
    return { primary_port, secondary_port };
  } catch (e: any) {
    throw new Error(e);
  }
};

export const findPort = async () => {};
