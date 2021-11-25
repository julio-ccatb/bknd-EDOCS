export interface IRackId {
  rack_id: string;
}

export interface IdeviceToRack extends IRackId {
  device_id: string;
}

export interface IaddPortToDevice {
  interface: string;
  num: number;
  device_id: string;
}

export interface IportToDevice {
  port: string;
  device: string;
  target: string;
  targetPort: string;
}
