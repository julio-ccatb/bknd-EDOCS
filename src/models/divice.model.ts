import mongoose from "mongoose";

export interface DiviceDocument extends mongoose.Document {
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

const DiviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    short_name: { type: String, default: "", trim: true },
    location: { type: Number, default: 1 },
    ip: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    mac: { type: String, required: true, trim: true },
    frim_ver: { type: String, required: true, trim: true },
    boot_ver: { type: String, required: true, trim: true },
    rack: { type: String, trim: true },
  },
  { timestamps: true }
);

const DiviceModel = mongoose.model<DiviceDocument>("Divice", DiviceSchema);

export default DiviceModel;
