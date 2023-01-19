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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Image:
 *        type: object
 *        properties:
 *          publicId:
 *            required: true
 *            type: string
 *          secureUrl:
 *            required: true
 *            type: string
 * 
 *      CreateProduct:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          name: 
 *            required: true
 *            type: string
 *          description:
 *            required: true
 *            type: string
 *          price:
 *            required: true
 *            type: number
 *          stock:
 *            required: true
 *            type: number
 *          images:
 *            required: true
 *            type: array
 *            items:
 *              type: string
 *              format: binary
 *          brand:
 *            required: true
 *            type: string
 *          category:
 *            required: true
 *            type: string
 *        required:
 *          - name
 *          - description
 *          - price
 *          - stock
 *          - images
 *          - brand
 *          - category
 *          
 *      Product: 
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          name: 
 *            required: true
 *            type: string
 *          description:
 *            required: true
 *            type: string
 *          price:
 *            required: true
 *            type: number
 *          stock:
 *            required: true
 *            type: number
 *          images:
 *            required: true
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Image'
 *          brand:
 *            required: true
 *            type: string
 *          category:
 *            required: true
 *            type: string
 *        required:
 *          - id
 *          - name
 *          - description
 *          - price
 *          - stock
 *          - brand
 *          - category
 *    
 *    parameters:
 *      productId:
 *        in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 * 
 *    responses:
 *      ProductNotFound:
 *        description: The product does not exist.
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                message: 
 *                  type: string
 *      ProductBadRequest:
 *        description: Some product properties are invalid.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      ProductNameExist:
 *        description: The product name already exist.
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
 *  name: Products
 *  description: Products endpoints
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products.
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: The list of products.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */

router.get("/", productController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by Id.
 *    tags: [Products]
 *    parameters:
 *      - $ref: '#/components/parameters/productId'
 *    responses:
 *      200:
 *        description: Returns a product if found.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404: 
 *        $ref: '#/components/responses/ProductNotFound'
 *        
 */

router.get(
  "/:id",
  schemaValidator(GetProductSchema),
  productController.getProduct
);

/**
 * @swagger
 * /api/products/add:
 *  post:
 *    summary: Create a product.
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/CreateProduct'
 *    responses:
 *      201:
 *        description: Create a product.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        $ref: '#/components/responses/ProductBadRequest'
 *      409: 
 *        $ref: '#/components/responses/ProductNameExist'
 */

router.post(
  "/add",
  upload.array("images"),
  schemaValidator(CreateProductSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  productController.postProduct
);

/**
 * @swagger
 * /api/products/update/{id}:
 *  put:
 *    summary: Update a product.
 *    tags: [Products]
 *    parameters:
 *      - $ref: '#/components/parameters/productId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Returns the updated product.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      409: 
 *        $ref: '#/components/responses/ProductNameExist'
 *      404: 
 *        $ref: '#/components/responses/ProductNotFound'
 */

router.put(
  "/update/:id",
  schemaValidator(EditProductSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  productController.putProduct
);

/**
 * @swagger
 * /api/products/delete/{id}:
 *  delete:
 *    summary: Delete a Product.
 *    tags: [Products]
 *    parameters:
 *      - $ref: '#/components/parameters/productId'
 *    responses:
 *      200:
 *        description: Returns the deleted product.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404: 
 *        $ref: '#/components/responses/ProductNotFound'
 */

router.delete(
  "/delete/:id",
  schemaValidator(GetProductSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  productController.deleteProduct
);

export default router;
