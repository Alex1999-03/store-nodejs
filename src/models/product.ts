import { Schema, model } from "mongoose";
import { IProduct } from "../utils/interfaces";

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: [
      {
        publicId: { type: String, required: true, trim: true },
        secureUrl: { type: String, required: true, trim: true },
      },
    ],
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Product = model<IProduct>("Product", ProductSchema);
