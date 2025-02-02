import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import jwt from '../utils/token'
import {z} from 'zod'
import { validateParams } from '../utils/schemaValidate'

const router = Router();
const profileController: ProfileController = new ProfileController();

const idSchema = z.object({id: z.string().uuid()});

router.get("/", jwt.validateToken, profileController.getAllProfiles.bind(profileController));
router.delete("/:id", validateParams(idSchema), profileController.deleteProfile.bind(profileController));

export default router;