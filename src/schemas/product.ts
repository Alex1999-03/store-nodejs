import { z } from "zod";
import { IdSchema } from "./id";

const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 5000000;

const ImagesSchema = z
  .array(z.any())
  .superRefine((files: Express.Multer.File[], ctx) => {
    for (let file of files) {
      if (!ACCEPTED_MIME_TYPES.includes(file.mimetype)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `The file ${
            file.originalname
          } only accept ${ACCEPTED_MIME_TYPES.join(", ")}.`,
        });
      }

      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `The file ${file.originalname} size is more than 5MB.`,
        });
      }
    }
  });

const BodySchema = z.object({
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
  description: z
    .string({
      required_error: "The description is required.",
      invalid_type_error: "The description must be a string.",
    })
    .min(32, { message: "The description muest have at least 32 characters." })
    .max(4096, {
      message: "The description must have maximum 4096 characters.",
    }),
  stock: z.coerce
    .number({
      required_error: "The stock is required.",
      invalid_type_error: "The stock must be a number.",
    })
    .nonnegative({ message: "The stock must not be negative." }),
  price: z.coerce
    .number({
      required_error: "The price is required.",
      invalid_type_error: "The price must be a number.",
    })
    .nonnegative({ message: "The price must not be negative." }),
  brand: IdSchema,
  category: IdSchema,
});

export const CreateProductSchema = z.object({
  body: BodySchema,
  files: ImagesSchema,
});

export const EditProductSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
  body: BodySchema,
});

export const GetProductSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
});
