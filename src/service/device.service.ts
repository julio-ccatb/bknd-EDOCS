import { DocumentDefinition } from "mongoose";
import deviceModel, { deviceDocument } from "../models/device.model";

export const createdevice = async (
  input: DocumentDefinition<deviceDocument>
) => {
  try {
    const device = await deviceModel.create(input);

    return device.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
};
