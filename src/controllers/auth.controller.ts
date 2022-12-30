import * as bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { User } from "../models/user";
import * as JwtService from "../services/jwt.services";
import { StatusCode } from "../utils/enums";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (!userExist) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        password: hashPassword,
        detail: req.body.detail,
      });

      await user.save();

      return res.status(StatusCode.CREATED).json(JwtService.sign(user));
    }

    return res
      .status(StatusCode.FORBIDDEN)
      .json({ message: "The email user already exist." });
  } catch (error) {
    return next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(StatusCode.FORBIDDEN)
        .json({ message: "The user is not authorize." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(StatusCode.FORBIDDEN)
        .json({ message: "The user is not authorize." });

    return res.status(StatusCode.OK).json(JwtService.sign(user));
  } catch (error) {
    return next(error);
  }
};
