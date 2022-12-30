import { z } from "zod";

export const IdSchema = z
  .string({
    required_error: "the id is required.",
    invalid_type_error: "the id must be a string.",
  })
  .regex(/^[0-9a-fA-z]{24}$/, {
    message: "The id is not a ObjectId valid.",
  });
