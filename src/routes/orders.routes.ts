import passport from "passport";
import { Router } from "express";
import { rolesValidator } from "../middlewares/rolesValidator.middleware";
import { Roles } from "../utils/enums";
import * as orderController from "../controllers/orders.controller";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import {
  CreateOrderSchema,
  EditOrderSchema,
  GetOrderSchema,
} from "../schemas/order";

const router = Router();

router.get("/", orderController.getOrder);

router.get("/:id", schemaValidator(GetOrderSchema), orderController.getOrder);

router.post(
  "/add",
  schemaValidator(CreateOrderSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN, Roles.CUSTOMER]),
  orderController.postOrder
);

router.put(
  "/update/:id",
  schemaValidator(EditOrderSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN, Roles.CUSTOMER]),
  orderController.putOrder
);

router.delete(
  "/delete/:id",
  schemaValidator(GetOrderSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN, Roles.CUSTOMER]),
  orderController.deleteOrder
);

export default router;
