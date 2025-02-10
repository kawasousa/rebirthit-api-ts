import { Router } from "express";
import AuthController from "../controllers/AuthController";
import jwt from '../config/jwt'
import { validateProfile } from "../middlewares/validationMiddleware";

const router = Router();
const authController: AuthController = new AuthController();

router.post("/login", authController.login.bind(authController));
router.post("/register", validateProfile, authController.register.bind(authController));
router.post("/logout", jwt.validate, authController.logout.bind(authController));
router.get("/me", jwt.validate, authController.getCurrentProfile.bind(authController));

export default router;