import { object, string, TypeOf } from "zod";

//ZOD Validation

export const createdeviceSchema = object({
  body: object({
    name: string({
      invalid_type_error: "name must be an string",
      required_error: "name is required",
    }),
    ip: string({
      invalid_type_error: "ip must be an string",
      required_error: "ip is required",
    }),
    description: string({
      invalid_type_error: "description must be an string",
      required_error: "description is required",
    }),
    mac: string({
      invalid_type_error: "mac must be an string",
      required_error: "mac is required",
    }),
    frim_ver: string({
      invalid_type_error: "frim_ver must be an string",
      required_error: "frim_ver is required",
    }),
    boot_ver: string({
      invalid_type_error: "boot_ver must be an string",
      required_error: "boot_ver is required",
    }),
  }),
});

//FIND DEVICE BY ID VALIDATION

export const findDeviceSchema = object({
  params: object({
    device_id: string({ required_error: "device_id is required" }),
  }),
});

//input to validate

export type createdeviceInput = TypeOf<typeof createdeviceSchema>;
export type findDeviceInput = TypeOf<typeof findDeviceSchema>;
