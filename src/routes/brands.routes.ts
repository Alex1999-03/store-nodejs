import { Router } from "express";
import passport from "passport";
import * as brandController from "../controllers/brands.controller";
import { rolesValidator } from "../middlewares/rolesValidator.middleware";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import {
  CreateBrandSchema,
  EditBrandSchema,
  GetBrandSchema,
} from "../schemas/brand";
import { Roles } from "../utils/enums";

const router = Router();

router.get("/", brandController.getBrands);

router.get("/:id", schemaValidator(GetBrandSchema), brandController.getBrand);

router.post(
  "/add",
  schemaValidator(CreateBrandSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  brandController.postBrand
);

router.put(
  "/update/:id",
  schemaValidator(EditBrandSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  brandController.putBrand
);

router.delete(
  "/delete/:id",
  schemaValidator(GetBrandSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  brandController.deleteBrand
);

export default router;
