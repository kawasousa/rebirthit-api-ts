import { Router } from "express";
import AuthController from "../controllers/AuthController";
import jwt from '../config/jwt'
import { validateProfile } from "../middlewares/validationMiddleware";

const router = Router();
const authController: AuthController = new AuthController();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a profile
 *     description: Authenticate a user and generate a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uniqueCredential:
 *                 type: string
 *                 description: The username or email of the user
 *                 example: 'john_doe'
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: 'securepassword'
 *     responses:
 *       200:
 *         description: Login successful, returns profile and token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: object
 *                   description: The profile object of the logged-in user
 *                   example: { "username": "john_doe", "name": "John Doe", "role": "user" }
 *                 message:
 *                   type: string
 *                   example: "login successful"
 *       400:
 *         description: Bad request (missing or invalid credentials)
 *       401:
 *         description: Unauthorized (invalid credentials)
 */
router.post("/login", authController.login.bind(authController));
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new profile
 *     description: Create a new user profile with a unique credential
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: 'john_doe'
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: 'john.doe@example.com'
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: 'securepassword'
 *               name:
 *                 type: string
 *                 description: The user's full name
 *                 example: 'John Doe'
 *               icon:
 *                 type: string
 *                 description: The URL or path to the user's profile icon
 *                 example: 'https://example.com/icon.png'
 *               role:
 *                 type: string
 *                 description: The role of the user (Admin/User)
 *                 example: 'user'
 *     responses:
 *       201:
 *         description: Profile successfully created and authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: object
 *                   description: The created profile object
 *                   example: { "username": "john_doe", "name": "John Doe", "role": "user" }
 *                 message:
 *                   type: string
 *                   example: "registration successful"
 *       400:
 *         description: Invalid data provided (missing fields)
 *       409:
 *         description: Conflict (the profile already exists)
 */
router.post("/register", validateProfile, authController.register.bind(authController));
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout the current user
 *     security:
 *       - BearerAuth: []
 *     description: Logs the user out by clearing the authentication token
 *     responses:
 *       204:
 *         description: Logout successful (No content)
 *       400:
 *         description: Token not provided or invalid
 */
router.post("/logout", jwt.validate, authController.logout.bind(authController));
/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current authenticated profile
 *     description: Returns the profile information of the currently authenticated user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile information of the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: object
 *                   description: The profile of the authenticated user
 *                   example: { "username": "john_doe", "name": "John Doe", "role": "user" }
 *       400:
 *         description: Profile not authenticated
 */
router.get("/me", jwt.validate, authController.getCurrentProfile.bind(authController));

export default router;