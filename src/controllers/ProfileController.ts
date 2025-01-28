import { Request, Response } from "express";
import ProfileService from "../services/ProfileService";

export default class ProfileController{
    private profileService: ProfileService;

    constructor(){
        this.profileService = new ProfileService();
    }

    public async getAllProfiles(req: Request, res: Response): Promise<void>{
        const response = await this.profileService.findAllProfiles();
        res.status(200).json(response);
    }

    public async createProfile(req: Request, res: Response){
        const {
            nickname,
            email,
            photo_url,
            password,
            isActivated,
            isAdvanced
        } = req.body;

        try {
            const profile = await this.profileService.createProfile(nickname, email, photo_url, password, isActivated, isAdvanced);
            res.status(201).json(profile);

        } catch (error: any) {
            res.status(400).json({message: `An user with this ${error.meta.target} already exists.`})
        }
    }
}