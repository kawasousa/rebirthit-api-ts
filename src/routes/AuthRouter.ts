    import { Router } from "express";
    import AuthController from "../controllers/AuthController";
    import jwt from '../utils/token'
    import { validateBody } from '../utils/schemaValidate'
    import {z} from 'zod'

    const router = Router();
    const authController: AuthController = new AuthController();

    const profileSchema = z.object({
        username: z.string().min(1).max(30),
        name: z.string().min(1).max(50),
        icon: z.string(),
        password: z.string().min(4).max(30),
        role: z.string(),
    })

    router.post("/login", authController.login.bind(authController));
    router.post("/register", validateBody(profileSchema), authController.register.bind(authController));
    router.post("/loggout", authController.loggout.bind(authController));
    router.get("/me", jwt.validateToken, authController.getCurrentProfile.bind(authController));

    export default router;