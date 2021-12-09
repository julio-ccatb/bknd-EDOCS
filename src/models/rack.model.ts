import mongoose from 'mongoose';

export interface RackDocument extends mongoose.Document {
  name: string;
  floor: string;
  createdAt: Date;
  updatedAt: Date;
}

const RackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    floor: { type: Number, required: true, default: 1 },
  },

  { timestamps: true }
);

const RackModel = mongoose.model<RackDocument>('Rack', RackSchema);

export default RackModel;
