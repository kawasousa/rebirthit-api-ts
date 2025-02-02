import { Request, Response } from "express";
import ProfileService from "../services/ProfileService";
import { ProfileDTO } from "../models/ProfileDTO";

export default class ProfileController {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    public async getAllProfiles(req: Request, res: Response): Promise<void> {
        const profiles: ProfileDTO[] = await this.profileService.findAllProfiles();
        res.status(200).json({profiles});
    }

    public async deleteProfile(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = this.profileService.deleteProfile(id);

        if(!user){
            res.status(204).json({status: "failure"});
        }

        res.status(204).json({status: "sucess"});
    }
}