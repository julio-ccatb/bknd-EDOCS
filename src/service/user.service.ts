import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

/**
 *
 * @param input
 * @description Makes a User object qand upload it to the database
 * @returns
 */
export const createUser = async (
  input: Omit<
    DocumentDefinition<UserDocument>,
    "createdAt" | "updatedAt" | "comparePassword"
  >
) => {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);
};