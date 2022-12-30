import { Router } from "express";
import passport from "passport";
import * as categoryController from "../controllers/categories.controllers";
import {
  CreateCategorySchema,
  EditCategorySchema,
  GetCategorySchema,
} from "../schemas/category";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import { rolesValidator } from "../middlewares/rolesValidator.middleware";
import { Roles } from "../utils/enums";

const router = Router();

router.get("/", categoryController.getCategories);

router.get(
  "/:id",
  schemaValidator(GetCategorySchema),
  categoryController.getCategory
);

router.post(
  "/add",
  schemaValidator(CreateCategorySchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  categoryController.postCategory
);

router.put(
  "/update/:id",
  schemaValidator(EditCategorySchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  categoryController.putCategory
);

router.delete(
  "/delete/:id",
  schemaValidator(GetCategorySchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  categoryController.deleteCategory
);

export default router;
