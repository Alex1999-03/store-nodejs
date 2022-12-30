import { z } from "zod";
import { IdSchema } from "./id";

const BodySchema = z.object({
  name: z
    .string({
      required_error: "the name is required.",
      invalid_type_error: "The name must be a string.",
    })
    .regex(/[A-za-z\u00C0-\u00FF&\s]/, {
      message: "The name must contain only letters.",
    })
    .min(4, { message: "The name must have at least 4 characters." })
    .max(16, { message: "The name must have maximum 16 characters." }),
});

export const CreateBrandSchema = z.object({
  body: BodySchema,
});

export const EditBrandSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
  body: BodySchema,
});

export const GetBrandSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
});
