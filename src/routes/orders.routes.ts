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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Items:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          price:
 *            type: number
 *          quantity:
 *            type: number
 *      Order: 
 *        type: object
 *        properties:
 *          id: 
 *            type: string
 *          customer:
 *            type: string
 *          total: 
 *            type: number
 *          isCancel: 
 *            type: boolean
 *          items:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Items'
 *        required:
 *          - customer
 *          - total
 *          - isCancel
 *          - items
 *      CreateOrder:
 *        type: object
 *        properties:
 *          customer:
 *            type: string
 *          items:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Items'
 *        required:
 *          - customer
 *          - items
 *      UpdateOrder:
 *        type: object
 *        properties:
 *          id: 
 *            type: string
 *          customer:
 *            type: string
 *          isCancel: 
 *            type: boolean
 *          items:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Items'
 *        required:
 *          - customer
 *          - items
 * 
 *    parameters:
 *      orderId:
 *        in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 * 
 *    responses:
 *      OrderNotFound:
 *        description: The order does not exist.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: 
 *                  type: string
 *      OrderBadRequest:
 *        description: Some order properties are invalid.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

/**
 * @swagger
 * tags:
 *  name: Orders
 *  description: Orders endpoints
 */

/**
 * @swagger
 * /api/orders:
 *  get:
 *    summary: Get a list of orders.
 *    tags: [Orders]
 *    responses:
 *      200:
 *        description: The list of orders.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Order'
 */

router.get("/", orderController.getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *  get:
 *    summary: Get a order by Id.
 *    tags: [Orders]
 *    parameters:
 *      - $ref: '#/components/parameters/orderId'
 *    responses:
 *      200:
 *        description: Returns a order if found.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      404: 
 *        $ref: '#/components/responses/OrderNotFound'
 *        
 */

router.get("/:id", schemaValidator(GetOrderSchema), orderController.getOrder);

/**
 * @swagger
 * /api/orders/add:
 *  post:
 *    summary: Create a order.
 *    tags: [Orders]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateOrder'
 *    responses:
 *      201:
 *        description: Create a order.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        $ref: '#/components/responses/OrderBadRequest'
 */

router.post(
  "/add",
  schemaValidator(CreateOrderSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN, Roles.CUSTOMER]),
  orderController.postOrder
);

/**
 * @swagger
 * /api/orders/update/{id}:
 *  put:
 *    summary: Update a order.
 *    tags: [Orders]
 *    parameters:
 *      - $ref: '#/components/parameters/orderId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateOrder'
 *    responses:
 *      200:
 *        description: Returns the updated order.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        $ref: '#/components/responses/OrderBadRequest'
 *      404: 
 *        $ref: '#/components/responses/BrandNotFound'
 */

router.put(
  "/update/:id",
  schemaValidator(EditOrderSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN, Roles.CUSTOMER]),
  orderController.putOrder
);

/**
 * @swagger
 * /api/orders/delete/{id}:
 *  delete:
 *    summary: Delete a order.
 *    tags: [Orders]
 *    parameters:
 *      - $ref: '#/components/parameters/orderId'
 *    responses:
 *      200:
 *        description: Returns the deleted order.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      400:
 *        $ref: '#/components/responses/OrderBadRequest'
 *      404: 
 *        $ref: '#/components/responses/OrderNotFound'
 */

router.delete(
  "/delete/:id",
  schemaValidator(GetOrderSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN, Roles.CUSTOMER]),
  orderController.deleteOrder
);

export default router;
