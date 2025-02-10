import { NextFunction, Request, Response } from "express";
import { InteractionService } from "../services/InteractionService";
import { BadRequestError } from "../errors";

export class InteractionController {
    private interactionService: InteractionService;
    constructor() {
        this.interactionService = new InteractionService();
    };

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { advancedPostId, username, type } = req.body;

        try {
            if (!advancedPostId) throw new BadRequestError('advancedPostId not provided');
            if (!username) throw new BadRequestError('username not provided');
            if (!type) throw new BadRequestError('type not provided');

            const interaction = await this.interactionService.create(advancedPostId, username, type);
            res.status(201).json(interaction);
        } catch (error: any) {
            next(error);
        }
    }

    public async getAllByPostId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { advancedPostId } = req.params;

        try {
            const interactions = await this.interactionService.getAllByPostId(advancedPostId);
            res.status(200).json(interactions)
        } catch (error: any) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { advancedPostId, username, type } = req.body;

        try {
            if (!advancedPostId) throw new BadRequestError('advancedPostId not provided');
            if (!username) throw new BadRequestError('username not provided');
            if (!type) throw new BadRequestError('type not provided');

            await this.interactionService.update(advancedPostId, username, type);
            res.status(204).end();
        } catch (error: any) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { advancedPostId, username } = req.body;

        try {
            if (!advancedPostId) throw new BadRequestError('advancedPostId not provided');
            if (!username) throw new BadRequestError('username not provided');

            await this.interactionService.delete(advancedPostId, username);
            res.status(204).end();
        } catch (error: any) {
            next(error);
        }
    }
}