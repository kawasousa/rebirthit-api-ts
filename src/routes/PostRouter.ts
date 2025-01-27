import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();
const postController: PostController = new PostController();

router.get("/", postController.getAllPosts.bind(postController));

export default router;