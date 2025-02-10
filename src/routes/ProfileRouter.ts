import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import jwt from '../config/jwt'

const router = Router();
const profileController: ProfileController = new ProfileController();

router.get("/", jwt.validate, profileController.getAll.bind(profileController));
router.delete("/:username", profileController.delete.bind(profileController));

export default router;