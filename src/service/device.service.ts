import { DocumentDefinition } from "mongoose";
import DeviceModel, { deviceDocument } from "../models/device.model";
import PortModel, { PortDocument } from "../models/port.model";
import { IaddPortToDevice } from "../interface/rack.interface";

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
