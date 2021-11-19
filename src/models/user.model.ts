import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
