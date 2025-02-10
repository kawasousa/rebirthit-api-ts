import { NextFunction, Request, Response } from 'express';
import PostService from '../services/PostService';
import { BadRequestError } from '../errors';

export default class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const posts = await this.postService.getAll();
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { title, content, username } = req.body;

        try {
            if (!content) throw new BadRequestError('content not provided');
            if (!username) throw new BadRequestError('username not provided');

            const post = await this.postService.create(content, username, title);
            res.status(201).json(post);
        } catch (error: any) {
            next(error)
        }
    }

    public async createAdvanced(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { content, username, title } = req.body;

        try {
            if (!content) throw new BadRequestError('content not provided');
            if (!username) throw new BadRequestError('username not provided');

            const advancedPost = await this.postService.createAdvanced(content, username, title);
            res.status(201).json(advancedPost);
        } catch (error: any) {
            next(error)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const { requestingUsername } = req.body;

        try {
            if (!requestingUsername) throw new BadRequestError('requestingUsername not provided');

            await this.postService.delete(id, requestingUsername);
            res.status(204).end();
        } catch (error: any) {
            next(error);
        }
    }

    public async deleteAdvanced(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { requestingUsername } = req.body;

        try {
            if (!requestingUsername) throw new BadRequestError('requestingUsername not provided');

            await this.postService.deleteAdvanced(id, requestingUsername);
            res.status(204).end();
        } catch (error: any) {
            next(error);
        }
    }
}