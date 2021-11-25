import mongoose from "mongoose";
import RackModel from "./rack.model";

export interface deviceDocument extends mongoose.Document {
  name: string;
  short_name: string;
  ip: string;
  description: string;
  mac: string;
  frim_ver: string;
  boot_ver: string;
  location: number;
  rack: string;
  createdAt: Date;
  updatedAt: Date;
}

const deviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    short_name: { type: String, default: "", trim: true },
    location: { type: Number, default: 1 },
    ip: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    mac: { type: String, required: true, trim: true },
    frim_ver: { type: String, required: true, trim: true },
    boot_ver: { type: String, required: true, trim: true },
    rack: { type: mongoose.Schema.Types.ObjectId, ref: RackModel },
  },
  { timestamps: true }
);

const deviceModel = mongoose.model<deviceDocument>("device", deviceSchema);

export default deviceModel;
