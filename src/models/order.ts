import { Schema, model } from "mongoose";
import { IOrder } from "../utils/interfaces";

const OrderSchema = new Schema<IOrder>(
  {
    customer: { type: Schema.Types.ObjectId, required: true },
    total: { type: Number, ref: "User", require: true },
    isCancel: { type: Boolean, require: true, default: false },
    items: [
      {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Order = model("Order", OrderSchema);
