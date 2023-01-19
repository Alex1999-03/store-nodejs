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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Category: 
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
 *      categoryId:
 *        in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 * 
 *    responses:
 *      CategoryNotFound:
 *        description: The category does not exist.
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                message: 
 *                  type: string
 *      CategoryBadRequest:
 *        description: Some category properties are invalid.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      CategoryNameExist:
 *        description: The category name already exist.
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
 *  name: Categories
 *  description: Categories endpoints
 */

/**
 * @swagger
 * /api/categories:
 *  get:
 *    summary: Get a list of product categories.
 *    tags: [Categories]
 *    responses:
 *      200:
 *        description: The list of product categories.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 */

router.get("/", categoryController.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *  get:
 *    summary: Get a category by Id.
 *    tags: [Categories]
 *    parameters:
 *      - $ref: '#/components/parameters/categoryId'
 *    responses:
 *      200:
 *        description: Returns a category if found.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      404: 
 *        $ref: '#/components/responses/CategoryNotFound'
 *        
 */

router.get(
  "/:id",
  schemaValidator(GetCategorySchema),
  categoryController.getCategory
);

/**
 * @swagger
 * /api/categories/add:
 *  post:
 *    summary: Create a category.
 *    tags: [Categories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      201:
 *        description: Create a category.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      400:
 *        $ref: '#/components/responses/CategoryBadRequest'
 *      409: 
 *        $ref: '#/components/responses/CategoryNameExist'
 */

router.post(
  "/add",
  schemaValidator(CreateCategorySchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  categoryController.postCategory
);

/**
 * @swagger
 * /api/categories/update/{id}:
 *  put:
 *    summary: Update a category.
 *    tags: [Categories]
 *    parameters:
 *      - $ref: '#/components/parameters/categoryId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: Returns the updated category.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      400:
 *        $ref: '#/components/responses/CategoryBadRequest'
 *      409: 
 *        $ref: '#/components/responses/CategoryNameExist'
 *      404: 
 *        $ref: '#/components/responses/CategoryNotFound'
 */

router.put(
  "/update/:id",
  schemaValidator(EditCategorySchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  categoryController.putCategory
);

/**
 * @swagger
 * /api/categories/delete/{id}:
 *  delete:
 *    summary: Delete a brand.
 *    tags: [Categories]
 *    parameters:
 *      - $ref: '#/components/parameters/categoryId'
 *    responses:
 *      200:
 *        description: Returns the deleted category.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      404: 
 *        $ref: '#/components/responses/CategoryNotFound'
 */

router.delete(
  "/delete/:id",
  schemaValidator(GetCategorySchema),
  passport.authenticate("jwt", { session: false }),
  rolesValidator([Roles.ADMIN]),
  categoryController.deleteCategory
);

export default router;
