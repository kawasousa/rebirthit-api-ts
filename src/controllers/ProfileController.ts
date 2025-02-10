import { NextFunction, Request, Response } from 'express';
import ProfileService from '../services/ProfileService';
import { Profile } from '../models/Profile';

export default class ProfileController {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profiles: Profile[] = await this.profileService.getAll();
            res.status(200).json(profiles);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username } = req.params;

        try {
            await this.profileService.delete(username);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}