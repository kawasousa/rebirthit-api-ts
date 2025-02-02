import { Router } from "express";
import PostController from "../controllers/PostController";
import { validateBody, validateParams } from "../utils/schemaValidate";
import { z } from 'zod'
import jwt from '../utils/token'

const router = Router();
const postController: PostController = new PostController();

const PostSchema = z.object({
    content: z.string().min(1),
    username: z.string()
})

const PostIdSchema = z.object({id: z.string().uuid()})

router.get("/", jwt.validateToken, postController.getAllPosts.bind(postController));
router.post("/", jwt.validateToken, validateBody(PostSchema), postController.createPost.bind(postController));
router.delete("/:id", jwt.validateToken, validateParams(PostIdSchema), postController.deletePost.bind(postController));

export default router;