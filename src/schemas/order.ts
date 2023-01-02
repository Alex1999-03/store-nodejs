import { z } from "zod";
import { ParamsSchema } from "./id";

const BodySchema = z.object({
  customer: ParamsSchema.shape.id,
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
  params: ParamsSchema,
  body: BodySchema,
});

export const GetOrderSchema = z.object({
  params: ParamsSchema,
});

export type OrderBodyType = z.infer<typeof BodySchema>;
