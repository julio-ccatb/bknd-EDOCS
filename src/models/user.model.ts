import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  //Function added
  comparePassword(candidatePaswword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hashes the password bedor saving the document

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) return next();

  let salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  let hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

// Compares the initial password with the encrypted
// This === object in normal function

userSchema.methods.comparePasswords = async function (
  candidatePassword: string
): Promise<Boolean> {
  let user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("user", userSchema);

export default UserModel;
