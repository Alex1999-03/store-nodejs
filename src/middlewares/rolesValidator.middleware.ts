import { RequestHandler } from "express";
import { Roles, StatusCode } from "../utils/enums";
import { IPayloadJWT } from "../utils/interfaces";

export const rolesValidator = (roles: Roles[]): RequestHandler => {
  return (req, res, next) => {
    const user = <IPayloadJWT>req.user;

    if (!user) {
      return res
        .status(StatusCode.FORBIDDEN)
        .json({ message: "The access to resource is forbidden." });
    }

    if (!roles.includes(user.role)) {
      return res
        .status(StatusCode.FORBIDDEN)
        .json({ message: "The access to resource is forbidden." });
    }

    return next();
  };
};
