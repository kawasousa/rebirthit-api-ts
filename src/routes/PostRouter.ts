import { Router } from "express";
import PostController from "../controllers/PostController";
import { validatePost, validateId } from "../middlewares/validationMiddleware";
import jwt from '../config/jwt'

const router = Router();
const postController: PostController = new PostController();

router.get("/", jwt.validate, postController.getAll.bind(postController));
router.post("/", jwt.validate, validatePost, postController.create.bind(postController));
router.post("/advanced", jwt.validate, validatePost, postController.createAdvanced.bind(postController));
router.delete("/:id", jwt.validate, validateId, postController.delete.bind(postController));
router.delete("/advanced/:id", jwt.validate, validateId, postController.deleteAdvanced.bind(postController));

export default router;