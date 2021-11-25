import { number, object, preprocess, string, TypeOf } from "zod";

//ZOD Validation Create Rack

export const createRackSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    floor: preprocess(
      (floorString) => parseInt(floorString as string, 10),
      number({
        required_error: "floor is required",
        invalid_type_error: "floor must be a number",
      }).positive()
    ),
  }),
});

export const findRackSchema = object({
  params: object({
    rack_id: string({ required_error: "rack_id is required" }),
  }),
});

//input to validate

export type createRackInput = TypeOf<typeof createRackSchema>;
export type createRackIdInput = TypeOf<typeof findRackSchema>;
