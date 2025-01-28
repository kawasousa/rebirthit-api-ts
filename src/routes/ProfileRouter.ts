import { Router } from "express";
import { validate } from "../utils/validate";
import {z} from "zod";
import ProfileController from "../controllers/ProfileController";

const router = Router();
const profileController: ProfileController = new ProfileController();

const ProfileSchema = z.object({
    nickname: z.string().min(1),
    email: z.string().email(),
    photo_url: z.string().url(),
    password: z.string().min(1),
    isActivated: z.boolean(),
    isAdvanced: z.boolean()
})

router.get("/", profileController.getAllProfile.bind(profileController));
router.post("/", validate(ProfileSchema), profileController.createProfile.bind(profileController));

export default router;