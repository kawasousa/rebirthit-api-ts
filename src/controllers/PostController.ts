import { Request, Response } from "express";
import PostService from "../services/PostService";

export default class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    public async getAllPosts(req: Request, res: Response): Promise<void> {
        const response = await this.postService.findAllPosts();
        res.status(200).json(response);
    }

    public async createPost(req: Request, res: Response): Promise<void> {
        const { isAdvanced, content, profileId } = req.body;

        try {
            const post = await this.postService.createPost(content, profileId);
            res.status(201).json(post);

        } catch (err: any) {
            res.status(400).json({ error: err.errors })
        }
    }

    public async deletePost(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const post = await this.postService.deletePost(id);
            res.status(200).json(post);

        } catch (err: any) {
            res.status(400).json({ error: err.errors })
        }
    }
}