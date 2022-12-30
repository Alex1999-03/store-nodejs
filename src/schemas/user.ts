import { z } from "zod";
import { IdSchema } from "./id";
import { Roles } from "../utils/enums";

const BodySchema = z.object({
  email: z
    .string({
      required_error: "The email is required",
      invalid_type_error: "The email must be a string.",
    })
    .email({ message: "The email is not valid." }),
  password: z
    .string({
      required_error: "The password is required.",
      invalid_type_error: "The password must be a string.",
    })
    .regex(/(?=.*\d)/, {
      message: "The password must have at least one digit.",
    })
    .regex(/(?=.*[a-z])/, {
      message: "The password must have at least one lower case character.",
    })
    .regex(/(?=.*[A-Z])/, {
      message: "The password must have at least one upper case character.",
    })
    .regex(/(?=.*\W)/, {
      message: "The password must have at least one special character.",
    })
    .min(8, { message: "The password must have at least 8 characters." }),
  role: z.nativeEnum(Roles, {
    required_error: "The role is required.",
    invalid_type_error: "The role is not valid.",
  }),
  detail: z.optional(
    z.object({
      firstName: z
        .string({
          required_error: "The firstName is required.",
          invalid_type_error: "The firstName must be a string.",
        })
        .min(4, { message: "The firstName must have at least 4 characters." })
        .max(16, { message: "The firstName must have maximum 16 characters." }),
      lastName: z
        .string({
          required_error: "The lastName is required.",
          invalid_type_error: "The lastName must be a string.",
        })
        .min(4, { message: "The lastName must have at least 4 characters." })
        .max(16, { message: "The lastName must have maximum 16 characters." }),
      phone: z
        .string({
          required_error: "The phone is required.",
          invalid_type_error: "The phone must be a string.",
        })
        .regex(/^\+[0-9]{1,3}\s[0-9]{4,14}$/, {
          message: "The phone number is invalid.",
        }),
    })
  ),
});

export const CreateUserSchema = z.object({
  body: BodySchema.omit({ role: true }),
});

export const LoginSchema = z.object({
  body: BodySchema.pick({ email: true, password: true }),
});

export const EditUserSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
  body: BodySchema,
});

export const GetUserSchema = z.object({
  params: z.object({
    id: IdSchema,
  }),
});
