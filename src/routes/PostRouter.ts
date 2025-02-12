import { Router } from "express";
import PostController from "../controllers/PostController";
import { validatePost, validateId } from "../middlewares/validationMiddleware";
import jwt from '../config/jwt'

const router = Router();
const postController: PostController = new PostController();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of posts (including both regular and advanced posts)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   username:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   name:
 *                     type: string
 *                   icon:
 *                     type: string
 *                   role:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/", jwt.validate, postController.getAll.bind(postController));
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - username
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post (optional)
 *               content:
 *                 type: string
 *                 description: The content of the post (required)
 *               username:
 *                 type: string
 *                 description: The username of the profile creating the post (required)
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 username:
 *                   type: string
 *       400:
 *         description: Bad request, missing required fields or invalid data
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized, profile not activated
 */
router.post("/", jwt.validate, validatePost, postController.create.bind(postController));
/**
 * @swagger
 * /posts/advanced:
 *   post:
 *     summary: Create a new advanced post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - username
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the advanced post (optional)
 *               content:
 *                 type: string
 *                 description: The content of the advanced post (required)
 *               username:
 *                 type: string
 *                 description: The username of the profile creating the post (required)
 *     responses:
 *       201:
 *         description: Advanced post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 username:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 name:
 *                   type: string
 *                 icon:
 *                   type: string
 *                 role:
 *                   type: string
 *                 interactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       profileId:
 *                         type: string
 *       400:
 *         description: Bad request, missing required fields or invalid data
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized, profile not activated
 */
router.post("/advanced", jwt.validate, validatePost, postController.createAdvanced.bind(postController));
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the post to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       400:
 *         description: Bad request, missing required fields
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized, only the post owner or admin can delete
 */
router.delete("/:id", jwt.validate, validateId, postController.delete.bind(postController));
/**
 * @swagger
 * /posts/advanced/{id}:
 *   delete:
 *     summary: Delete an advanced post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the advanced post to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Advanced post deleted successfully
 *       400:
 *         description: Bad request, missing required fields
 *       404:
 *         description: Advanced post not found
 *       401:
 *         description: Unauthorized, only the post owner or admin can delete
 */
router.delete("/advanced/:id", jwt.validate, validateId, postController.deleteAdvanced.bind(postController));

export default router;