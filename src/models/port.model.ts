import mongoose from "mongoose";
import deviceModel from "./device.model";

export interface PortDocument extends mongoose.Document {
  interface: string;
  port_num: number;
  device_id: string;
  config: { target_port: string; target_device: string };
  createdAt: Date;
  updatedAt: Date;
}

const PortSchema = new mongoose.Schema(
  {
    interface: { type: String, required: true, trim: true },
    port_num: { type: Number, required: true, default: 1 },
    device_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: deviceModel,
      required: true,
    },
    config: {
      target_port: { type: String, default: "none", trim: true },
      target_device: { type: mongoose.Schema.Types.ObjectId, ref: deviceModel },
    },
  },

  { timestamps: true }
);

const PortModel = mongoose.model<PortDocument>("Port", PortSchema);

export default PortModel;
