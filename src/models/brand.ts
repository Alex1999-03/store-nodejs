import { Schema, model } from "mongoose";
import { IBrand } from "../utils/interfaces";

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Brand = model<IBrand>("Brand", BrandSchema);
