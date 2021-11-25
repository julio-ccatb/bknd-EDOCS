import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
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
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
};

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).lean();
};
