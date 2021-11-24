import { Omit } from "lodash";
import { DocumentDefinition } from "mongoose";
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
