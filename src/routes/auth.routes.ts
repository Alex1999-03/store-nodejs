import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import { CreateUserSchema, LoginSchema } from "../schemas/user";

const router = Router();

router.post(
  "/register",
  schemaValidator(CreateUserSchema),
  authController.register
);

router.post("/login", schemaValidator(LoginSchema), authController.login);

export default router;
