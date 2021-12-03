import { DocumentDefinition, FilterQuery } from "mongoose";
import DeviceModel, { deviceDocument } from "../models/device.model";
import PortModel, { PortDocument } from "../models/port.model";
import { IaddPortToDevice } from "../interface/rack.interface";
import { IdeviceId } from "../interface/device.interface";
import { connectPortInput, idPortInput } from "../schema/port.schema";
import { findDeviceInput } from "../schema/device.schema";

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

export const getDevices = async (): Promise<Array<deviceDocument>> => {
  try {
    const devices = await DeviceModel.find({});
    return devices;
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

export const getDevicePorts = async (query: FilterQuery<findDeviceInput>) => {
  try {
    const ports = await PortModel.find({ device_id: query.device_id });

    if (ports) return ports;
    return false;
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

    if (!primary_port || !secondary_port) return false;

    primary_port.connect(secondary_port);

    await primary_port.save();
    await secondary_port.save();

    return { primary_port, secondary_port };
  } catch (e: any) {
    throw new Error(e);
  }
};

export const disconnectPort = async (query: FilterQuery<idPortInput>) => {
  const port = await PortModel.findById({ _id: query.port_id });
  if (port) {
    const port_two = await PortModel.findById({
      _id: port?.config.target_port,
    });
    if (port && port_two) {
      await port.disconnect();
      await port_two?.disconnect();
      await port.save();
      await port_two?.save();
      return true;
    }
    return false;
  }
  return false;
};
export const findPort = async () => {};
