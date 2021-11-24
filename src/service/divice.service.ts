import { DocumentDefinition } from "mongoose";
import DiviceModel, { DiviceDocument } from "../models/divice.model";

export const createDivice = async (
  input: DocumentDefinition<DiviceDocument>
) => {
  try {
    const divice = await DiviceModel.create(input);

    return divice.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
};
