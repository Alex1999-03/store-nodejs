import { RequestHandler } from "express";
import { AnyZodObject } from "zod";
import { StatusCode } from "../utils/enums";

export const schemaValidator = (schema: AnyZodObject): RequestHandler => {
  return async (req, res, next) => {
    const result = await schema.safeParseAsync({
      params: req.params,
      body: req.body,
      files: req.files,
    });
    if (!result.success) {
      return res.status(StatusCode.BAD_REQUEST).json(
        result.error.issues.map((err) => ({
          field: err.path[err.path.length - 1],
          message: err.message,
        }))
      );
    }
    return next();
  };
};
