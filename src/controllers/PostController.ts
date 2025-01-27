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

}