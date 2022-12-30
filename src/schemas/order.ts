import { z } from "zod";
import { IdSchema } from "./id";

const BodySchema = z.object({
  customer: IdSchema,
  total: z
    .number({ required_error: "The total is required." })
    .nonnegative({ message: "The total must not be negative." }),
  isCancel: z.optional(z.boolean()),
  items: z.array(
    z.object({
      name: z
        .string({
          required_error: "The name is required.",
          invalid_type_error: "The name must be a string.",
        })
        .regex(/[A-za-z\u00C0-\u00FF&\s]/, {
          message: "The name must contain only letters.",
        })
        .min(4, { message: "The name must have at least 4 characters." })
        .max(32, { message: "The name must have maximum 16 characters." }),
      price: z
        .number({
          required_error: "The price is required.",
          invalid_type_error: "The price must be a number.",
        })
        .nonnegative({ message: "The price must not be negative." }),
      quantity: z
        .number({
          required_error: "The quantity is required.",
          invalid_type_error: "The quantity must be a number.",
        })
        .nonnegative({ message: "The quantity must not be negative." }),
    })
  ),
});

export const CreateOrderSchema = z.object({
  body: BodySchema,
});

export const EditOrderSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
  body: BodySchema,
});

export const GetOrderSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
});
