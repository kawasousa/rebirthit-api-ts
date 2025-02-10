import { Router } from "express";
import { InteractionController } from "../controllers/InteractionController";
import jwt from "../config/jwt";

const router = Router();
const interactionController = new InteractionController();

router.post("/",jwt.validate, interactionController.create.bind(interactionController));
router.get("/:advancedPostId", jwt.validate, interactionController.getAllByPostId.bind(interactionController));
router.put("/", jwt.validate, interactionController.update.bind(interactionController));
router.delete("/", jwt.validate, interactionController.delete.bind(interactionController));

export default router;