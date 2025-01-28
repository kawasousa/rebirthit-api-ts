import { Router } from "express";
import PostController from "../controllers/PostController";
import { validateBody, validateParams } from "../utils/validate";
import { z } from 'zod'

const router = Router();
const postController: PostController = new PostController();

const PostSchema = z.object({
    content: z.string().min(1),
    profileId: z.string().uuid(),
    isAdvanced: z.boolean()
})

const PostIdSchema = z.object({
    id: z.string().uuid()
});

router.get("/", postController.getAllPosts.bind(postController));
router.post("/", validateBody(PostSchema), postController.createPost.bind(postController));
router.delete("/:id", validateParams(PostIdSchema), postController.deletePost.bind(postController));

export default router;