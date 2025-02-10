import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { Role } from '@prisma/client';
import { BadRequestError } from '../errors';

export default class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const { uniqueCredential, password } = req.body;

        try {
            if (!uniqueCredential) throw new BadRequestError('uniqueCredential not provided');
            if (!password) throw new BadRequestError('password not provided');

            const { profileDTO, token } = await this.authService.login(uniqueCredential, password);

            const expires = new Date();
            expires.setDate(expires.getDate() + 1);
            res.cookie('auth_token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires
            })

            res.status(200).json({ profile: profileDTO, message: 'login successful' });
        } catch (error: any) {
            next(error);
        }
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        const { username, email, password, name, icon, role } = req.body;

        try {
            if (!Object.values(Role).includes(role as Role)) throw new BadRequestError('invalid profile role');
            const profileRole: Role = role as Role;

            const { profileDTO, token } = await this.authService.register(username, email, password, name, icon, profileRole);

            const expires = new Date();
            expires.setDate(expires.getDate() + 1);
            res.cookie('auth_token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires
            })

            res.status(201).json({ profile: profileDTO, message: 'registration successful' });
        } catch (error: any) {
            next(error);
        }
    }

    public async getCurrentProfile(req: Request, res: Response, next: NextFunction) {
        const aProfile = req.profile;

        try {
            if (!aProfile) throw new BadRequestError('profile not authenticated')

            const profile = await this.authService.getProfileById(aProfile.profileId);
            res.status(200).json({ profile })
        } catch (error: any) {
            next(error);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('auth_token', {
                httpOnly: true,
                sameSite: 'none',
                secure: true
            })

            res.status(204).end();
        } catch (error: any) {
            next(error)
        }
    }
}