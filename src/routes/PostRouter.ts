import { Router } from "express";
import PostController from "../controllers/PostController";
import { validate } from "../utils/validate";
import { z } from 'zod'

const router = Router();
const postController: PostController = new PostController();

const PostSchema = z.object({
    content: z.string().min(1),
    profileId: z.string().uuid(),
    isAdvanced: z.boolean()
})

router.get("/", postController.getAllPosts.bind(postController));
router.post("/", validate(PostSchema), postController.createPost.bind(postController));

export default router;