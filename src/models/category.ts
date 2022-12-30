import { Schema, model } from "mongoose";
import { ICategory } from "../utils/interfaces";

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Category = model<ICategory>("Category", CategorySchema);
