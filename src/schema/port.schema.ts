import { number, object, preprocess, string, TypeOf } from 'zod';

//ZOD Validation

export const createPortSchema = object({
  body: object({
    interface: string({
      required_error: 'interface is required',
    }).refine(
      (int) => ['fa', 'gig'].find((x) => x === int.toLowerCase()) !== undefined,
      {
        path: ['interface'],
        message: 'interface not valid try with [ gig , fa ]',
      }
    ),
    num: preprocess(
      (num_ports) => parseInt(num_ports as string, 10),
      number({
        required_error: 'num is required',
        invalid_type_error: 'num must be a number',
      }).positive()
    ),
    device_id: string({
      required_error: 'device_id is required',
    }),
  }),
});

// CONNECT PORT TO PORT

export const connectPortSchema = object({
  body: object({
    device_id: string({
      required_error: 'device_id is required',
      invalid_type_error: 'device_id must be string',
    }),
    port_id: string({
      required_error: 'port_id is required',
      invalid_type_error: 'port_id must be string',
    }),
    target_device_id: string({
      required_error: 'target_device_id is required',
      invalid_type_error: 'target_device_id must be string',
    }),
    target_port_id: string({
      required_error: 'target_port_id is required',
      invalid_type_error: 'target_port_id must be string',
    }),
  }),
});
export const idPortBodySchema = object({
  body: object({
    port_id: string({
      required_error: 'port_id is required',
      invalid_type_error: 'port_id must be string',
    }),
  }),
});
export const idPortParamSchema = object({
  params: object({
    port_id: string({
      required_error: 'port_id is required',
      invalid_type_error: 'port_id must be string',
    }),
  }),
});

//input to validate+

export type createPortInput = TypeOf<typeof createPortSchema>;
export type connectPortInput = TypeOf<typeof connectPortSchema>;
export type idPortInput = TypeOf<typeof idPortBodySchema>;
export type idPortParamInput = TypeOf<typeof idPortParamSchema>;
