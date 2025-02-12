import { Router } from "express";
import { InteractionController } from "../controllers/InteractionController";
import jwt from "../config/jwt";

const router = Router();
const interactionController = new InteractionController();

/**
 * @swagger
 * /interactions:
 *   post:
 *     summary: Create a new interaction for a post
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               advancedPostId:
 *                 type: string
 *                 description: The ID of the post to interact with
 *               username:
 *                 type: string
 *                 description: The username of the profile interacting
 *               type:
 *                 type: string
 *                 enum: [LIKE, DISLIKE, LOVE]
 *                 description: The type of interaction (e.g., LIKE, DISLIKE, LOVE)
 *             required:
 *               - advancedPostId
 *               - username
 *               - type
 *     responses:
 *       201:
 *         description: Interaction successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Interaction'
 *       400:
 *         description: Bad request (invalid input or missing fields)
 *       404:
 *         description: Profile or post not found
 *       409:
 *         description: Conflict (interaction already exists)
 *       500:
 *         description: Internal server error
 */
router.post("/", jwt.validate, interactionController.create.bind(interactionController));
/**
 * @swagger
 * /interactions/{advancedPostId}:
 *   get:
 *     summary: Get all interactions for a specific post
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: advancedPostId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to get interactions for
 *     responses:
 *       200:
 *         description: List of interactions for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Interaction'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get("/:advancedPostId", jwt.validate, interactionController.getAllByPostId.bind(interactionController));
/**
 * @swagger
 * /interactions:
 *   put:
 *     summary: Update an existing interaction for a post
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               advancedPostId:
 *                 type: string
 *                 description: The ID of the post to update interaction for
 *               username:
 *                 type: string
 *                 description: The username of the profile interacting
 *               type:
 *                 type: string
 *                 enum: [LIKE, DISLIKE, LOVE]
 *                 description: The new type of interaction (e.g., LIKE, DISLIKE, LOVE)
 *             required:
 *               - advancedPostId
 *               - username
 *               - type
 *     responses:
 *       204:
 *         description: Interaction successfully updated
 *       400:
 *         description: Bad request (invalid input or missing fields)
 *       404:
 *         description: Profile or interaction not found
 *       409:
 *         description: Conflict (interaction type is invalid)
 *       500:
 *         description: Internal server error
 */
router.put("/", jwt.validate, interactionController.update.bind(interactionController));
/**
 * @swagger
 * /interactions:
 *   delete:
 *     summary: Delete an existing interaction for a post
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               advancedPostId:
 *                 type: string
 *                 description: The ID of the post to delete interaction from
 *               username:
 *                 type: string
 *                 description: The username of the profile interacting
 *             required:
 *               - advancedPostId
 *               - username
 *     responses:
 *       204:
 *         description: Interaction successfully deleted
 *       400:
 *         description: Bad request (invalid input or missing fields)
 *       404:
 *         description: Profile or interaction not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", jwt.validate, interactionController.delete.bind(interactionController));

export default router;