import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../utils/enums";

export const logError = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  next(err);
};

export const httpErrorHandler = (
  _err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res
    .status(StatusCode.INTERNAL_SERVER_ERROR)
    .json({ message: "Ups, internal server error!" });
};
