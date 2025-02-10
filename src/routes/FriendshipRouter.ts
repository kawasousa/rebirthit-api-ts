import { Router } from "express";
import FriendshipController from "../controllers/FriendshipController";
import jwt from '../config/jwt'
import { validateFriendship } from "../middlewares/validationMiddleware";

const router = Router();
const friendshipController: FriendshipController = new FriendshipController();

router.get("/:username", jwt.validate, friendshipController.getAllByUsername.bind(friendshipController));
router.post("/", jwt.validate, validateFriendship, friendshipController.create.bind(friendshipController));
router.put("/", jwt.validate, validateFriendship, friendshipController.update.bind(friendshipController));
router.delete("/", jwt.validate, validateFriendship, friendshipController.delete.bind(friendshipController));

export default router;