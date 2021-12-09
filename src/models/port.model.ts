import mongoose from 'mongoose';
import deviceModel from './device.model';

export interface PortDocument extends mongoose.Document {
  interface: string;
  port_num: number;
  device_id: string;
  config: { target_port: string | null; target_device: string | null };
  status: number;
  createdAt: Date;
  updatedAt: Date;
  //functions
  connect(port_target: PortDocument): void;
  disconnect(): Promise<Boolean>;
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
    status: { type: Number, default: 0 },
    config: {
      target_port: { type: String, default: null, trim: true },
      target_device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: deviceModel,
        default: null,
      },
    },
  },

  { timestamps: true }
);

//CONNECT TO PORT FUNC

PortSchema.methods.connect = function (port_target: PortDocument) {
  let port = this as PortDocument;

  port.config.target_device = port_target.device_id;
  port.config.target_port = port_target._id;
  port.status = 1;

  port_target.config.target_device = port.device_id;
  port_target.config.target_port = port._id;
  port_target.status = 1;

  port.config.target_port;
};

//DISCONECT TO PORT FUNC

PortSchema.methods.disconnect = async function () {
  try {
    let port = this as PortDocument;
    if (!port.config.target_port) return false;

    port.config.target_device = null;
    port.config.target_port = null;
    return true;
  } catch (e: any) {
    return false;
  }
};

const PortModel = mongoose.model<PortDocument>('Port', PortSchema);

export default PortModel;
