import { object, string, TypeOf } from "zod";

//ZOD validation
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - shuld be at least 6 characters "),
    passwordConfirmation: string({
      required_error: "Password Confirm is required",
    }),
    email: string({ required_error: "Email is required" }).email(
      "Not valid email"
    ),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

//Input to validate
export type createUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
