import { number, object, preprocess, string, TypeOf } from "zod";

//ZOD Validation

export const createPortSchema = object({
  body: object({
    interface: string({
      required_error: "interface is required",
    }).refine(
      (int) => ["fa", "gig"].find((x) => x === int.toLowerCase()) !== undefined,
      {
        path: ["interface"],
        message: "interface not valid try with [ gig , fa ]",
      }
    ),
    num: preprocess(
      (num_ports) => parseInt(num_ports as string, 10),
      number({
        required_error: "num is required",
        invalid_type_error: "num must be a number",
      }).positive()
    ),
    device_id: string({
      required_error: "device_id is required",
    }),
  }),
});

//input to validate

export type createPortInput = TypeOf<typeof createPortSchema>;
