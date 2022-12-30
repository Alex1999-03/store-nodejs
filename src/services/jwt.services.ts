import jwt from "jsonwebtoken";
import { config } from "../config";
import { IUser } from "../utils/interfaces";

export const sign = (user: IUser) => {
  const payload = {
    sub: user.id,
    name: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.API_SECRET);
  
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    detail: user.detail,
    token,
  };
};
