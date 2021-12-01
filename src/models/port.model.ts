import mongoose from "mongoose";
import deviceModel from "./device.model";

export interface PortDocument extends mongoose.Document {
  interface: string;
  port_num: number;
  device_id: string;
  target_port: string;
  configuration: { targetPort: string };
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
  },

  { timestamps: true }
);

PortSchema.add({
  target_port: [PortSchema],
});

const PortModel = mongoose.model<PortDocument>("Port", PortSchema);

export default PortModel;
