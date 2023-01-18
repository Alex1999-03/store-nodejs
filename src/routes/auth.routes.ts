import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import { CreateUserSchema, LoginSchema } from "../schemas/user";

const router = Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Login:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *        required:
 *          - email
 *          - password
 *      Register:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          detail: 
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              phone:
 *                type: string
 *      Auth:
 *        type: object
 *        properties:
 *          id: 
 *            type: string
 *          email: 
 *            type: string
 *          roles: 
 *            type: string
 *          detail:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              phone:
 *                type: string
 *          token:
 *            type: string
 *    
 *    responses:
 *      UserCreated:
 *        description: The user was created.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *      RegisterBadRequest:
 *        description: Some user registration properties are invalid.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      LoginBadRequest:
 *        description: Some login properties are invalid.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      UserNotAuthorize:
 *        description: The user is not authorize.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: 
 *                  type: string
 *      UserConflict:
 *        description: The email already exists.
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
 *  tags:
 *    name: Auth
 *    description: Auth endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: User register
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Register'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/UserCreated'
 *      400:
 *        $ref: '#/components/responses/RegisterBadRequest'
 *      401:
 *        $ref: '#/components/responses/UserNotAuthorize'
 *      409:
 *        $ref: '#/components/responses/UserConflict'
 *        
 */

router.post(
  "/register",
  schemaValidator(CreateUserSchema),
  authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: User login
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: Return the user credentials
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *      400:
 *        $ref: '#/components/responses/LoginBadRequest'
 *      403:
 *        $ref: '#/components/responses/UserNotAuthorize'
 */

router.post("/login", schemaValidator(LoginSchema), authController.login);

export default router;
