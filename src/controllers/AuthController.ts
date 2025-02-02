import { Request, Response } from "express";
import AuthService, { Role } from "../services/AuthService";

export default class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async login(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const { profileDTO, token } = await this.authService.login(username, password);

            res.cookie("auth_token", token, {
                httpOnly: true,
                sameSite: "strict"
            })

            res.status(200).json({ profileDTO });
        } catch (error: any) {
            res.status(404).json({ error: error.message })
        }
    }

    public async register(req: Request, res: Response) {
        const { username, password, name, icon, role } = req.body;
        const profileRole: Role = Role[role as keyof typeof Role];

        try {
            const { profileDTO, token } = await this.authService.register(username, password, name, icon, profileRole);

            res.cookie("auth_token", token, {
                httpOnly: true,
                sameSite: "strict"
            })

            res.status(200).json({ profileDTO })
        } catch (error: any) {
            res.status(400).json({ error: "Invalid credentials" })
        }
    }

    public async getCurrentProfile(req: Request, res: Response) {
        try {
            if (req.profile) {
                const profile = await this.authService.getProfileById(req.profile.profileId);
                if (profile)
                    res.status(200).json({ profile })
                return;
            }

            res.status(401).json({ error: "profile not authenticated" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async loggout(req: Request, res: Response){
        try {
            res.clearCookie("auth_token", {
                httpOnly: true,
                sameSite: true
            })

            res.status(200).json({status: "sucess"})
        } catch (error) {
            res.status(400).json({error: "Error when logging out"})
        }
    }
}