import { Router } from "express";
import FriendshipController from "../controllers/FriendshipController";
import jwt from '../config/jwt'
import { validateFriendship } from "../middlewares/validationMiddleware";

const router = Router();
const friendshipController: FriendshipController = new FriendshipController();

/**
 * @swagger
 * /friendships/{username}:
 *   get:
 *     summary: Get all friendships of a user
 *     description: Retrieves a list of friendships for the specified username.
 *     tags: [Friendships]
 *     parameters:
 *       - name: username
 *         in: path
 *         description: Username of the user whose friendships are to be retrieved
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: A list of friendships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Friendship'
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:username", jwt.validate, friendshipController.getAllByUsername.bind(friendshipController));
/**
 * @swagger
 * /friendships:
 *   post:
 *     summary: Create a friendship
 *     description: Creates a friendship between two users with a given sender and receiver username.
 *     tags: [Friendships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderUsername:
 *                 type: string
 *               receiverUsername:
 *                 type: string
 *     security:
 *       - Bearer: []
 *     responses:
 *       201:
 *         description: Friendship created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Friendship already exists
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.post("/", jwt.validate, validateFriendship, friendshipController.create.bind(friendshipController));
/**
 * @swagger
 * /friendships:
 *   put:
 *     summary: Update friendship status
 *     description: Updates the status of a friendship between two users.
 *     tags: [Friendships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderUsername:
 *                 type: string
 *               receiverUsername:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, ACCEPTED, REJECTED]
 *     security:
 *       - Bearer: []
 *     responses:
 *       204:
 *         description: Friendship status updated
 *       400:
 *         description: Invalid status or missing data
 *       404:
 *         description: Friendship not found
 *       401:
 *         description: Unauthorized
 */
router.put("/", jwt.validate, validateFriendship, friendshipController.update.bind(friendshipController));
/**
 * @swagger
 * /friendships:
 *   delete:
 *     summary: Delete a friendship
 *     description: Deletes a friendship between two users.
 *     tags: [Friendships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderUsername:
 *                 type: string
 *               receiverUsername:
 *                 type: string
 *     security:
 *       - Bearer: []
 *     responses:
 *       204:
 *         description: Friendship deleted
 *       404:
 *         description: Friendship not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/", jwt.validate, validateFriendship, friendshipController.delete.bind(friendshipController));

export default router;