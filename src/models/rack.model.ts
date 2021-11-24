import mongoose from "mongoose";
import DiviceModel, { DiviceDocument } from "./divice.model";

export interface RackDocument extends mongoose.Document {
  name: string;
  floor: string;
  divices: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

const RackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    floor: { type: Number, required: true, default: 1 },
    divices: [{ type: mongoose.Schema.Types.ObjectId, ref: DiviceModel }],
  },

  { timestamps: true }
);

RackSchema.methods.addDivice = async function (divice: DiviceDocument) {
  try {
    let rack = this as RackDocument;
    rack.divices.push(divice._id);
    divice.rack = rack._id;
    return { rack, divice };
  } catch (e: any) {
    throw new Error(e);
  }
};

const RackModel = mongoose.model<RackDocument>("Rack", RackSchema);

export default RackModel;
