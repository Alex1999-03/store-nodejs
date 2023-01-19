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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Brand: 
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          name: 
 *            type: string
 *        required:
 *          - name
 * 
 *    parameters:
 *      brandId:
 *        in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 * 
 *    responses:
 *      BrandNotFound:
 *        description: The brand does not exist.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: 
 *                  type: string
 *      BrandBadRequest:
 *        description: Some brand properties are invalid.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      BrandNameExist:
 *        description: The brand name already exist.
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
 *  name: Brands
 *  description: Brands endpoints
 */

/**
 * @swagger
 * /api/brands:
 *  get:
 *    summary: Get a list of product brands.
 *    tags: [Brands]
 *    responses:
 *      200:
 *        description: The list of product brands.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Brand'
 */

router.get("/", brandController.getBrands);

/**
 * @swagger
 * /api/brands/{id}:
 *  get:
 *    summary: Get a brand by Id.
 *    tags: [Brands]
 *    parameters:
 *      - $ref: '#/components/parameters/brandId'
 *    responses:
 *      200:
 *        description: Returns a brand if found.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Brand'
 *      404: 
 *        $ref: '#/components/responses/BrandNotFound'
 *        
 */

router.get("/:id", schemaValidator(GetBrandSchema), brandController.getBrand);

/**
 * @swagger
 * /api/brands/add:
 *  post:
 *    summary: Create a brand.
 *    tags: [Brands]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Brand'
 *    responses:
 *      201:
 *        description: Create a brand.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Brand'
 *      400:
 *        $ref: '#/components/responses/BrandBadRequest'
 *      409: 
 *        $ref: '#/components/responses/BrandNameExist'
 */

router.post(
  "/add",
  schemaValidator(CreateBrandSchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  brandController.postBrand
);

/**
 * @swagger
 * /api/brands/update/{id}:
 *  put:
 *    summary: Update a brand.
 *    tags: [Brands]
 *    parameters:
 *      - $ref: '#/components/parameters/brandId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Brand'
 *    responses:
 *      200:
 *        description: Returns the updated brand.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Brand'
 *      400:
 *        $ref: '#/components/responses/BrandBadRequest'
 *      409: 
 *        $ref: '#/components/responses/BrandNameExist'
 *      404: 
 *        $ref: '#/components/responses/BrandNotFound'
 */

router.put(
  "/update/:id",
  schemaValidator(EditBrandSchema),
  brandController.putBrand
);

/**
 * @swagger
 * /api/brands/delete/{id}:
 *  delete:
 *    summary: Delete a brand.
 *    tags: [Brands]
 *    parameters:
 *      - $ref: '#/components/parameters/brandId'
 *    responses:
 *      200:
 *        description: Returns the deleted brand.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Brand'
 *      404: 
 *        $ref: '#/components/responses/BrandNotFound'
 */

router.delete(
  "/delete/:id",
  schemaValidator(GetBrandSchema),
  brandController.deleteBrand
);

export default router;
