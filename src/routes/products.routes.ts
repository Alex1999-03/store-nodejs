import passport from "passport";
import multer from "multer";
import { Router } from "express";
import * as productController from "../controllers/products.controller";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import {
  CreateProductSchema,
  EditProductSchema,
  GetProductSchema,
} from "../schemas/product";
import { rolesValidator } from "../middlewares/rolesValidator.middleware";
import { Roles } from "../utils/enums";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.get("/", productController.getProducts);

router.get(
  "/:id",
  schemaValidator(GetProductSchema),
  productController.getProduct
);

router.post(
  "/add",
  upload.array("images"),
  schemaValidator(CreateProductSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  productController.postProduct
);

router.put(
  "/update/:id",
  schemaValidator(EditProductSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  productController.putProduct
);

router.delete(
  "/delete/:id",
  schemaValidator(GetProductSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  productController.deleteProduct
);

export default router;
