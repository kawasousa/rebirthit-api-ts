import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import jwt from '../config/jwt'

const router = Router();
const profileController: ProfileController = new ProfileController();

/**
 * @swagger
 * /profiles:
 *   get:
 *     tags: [Profile]
 *     summary: Retrieve all profiles
 *     description: Requires authentication. Returns a list of profiles with their details.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   icon:
 *                     type: string
 *                   role:
 *                     type: string
 *                   postsCount:
 *                     type: integer
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 */
router.get("/", jwt.validate, profileController.getAll.bind(profileController));
/**
 * @swagger
 * /profiles/{username}:
 *   delete:
 *     tags: [Profile]
 *     summary: Delete a profile
 *     description: Deletes a profile based on the username.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the profile to delete.
 *     responses:
 *       204:
 *         description: Profile successfully deleted.
 *       404:
 *         description: Profile not found.
 */
router.delete("/:username", jwt.validate, profileController.delete.bind(profileController));

export default router;