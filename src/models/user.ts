import { Schema, model } from "mongoose";
import { Roles } from "../utils/enums";
import { IUser } from "../utils/interfaces";

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true, default: Roles.CUSTOMER },
    detail: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      phone: { type: String, trim: true },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
