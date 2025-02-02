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
        const { content, username } = req.body;

        if (!content || !username) {
            res.status(404).json({ error: "Required fields missing" })
            return;
        }

        try {
            const postDTO = await this.postService.createPost(content, username);

            res.status(201).json(postDTO);
        } catch (error: any) {
            console.log(error);
            res.status(404).json({ error: error.errors })
        }
    }

    public async deletePost(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { requestingUsername } = req.body;

        try {
            if (!id || !requestingUsername) throw new Error('post id and requesting username is required to delete a post');

            await this.postService.deletePost(id, requestingUsername);
            res.status(204).json({status: 'sucess'});

        } catch (error: any) {
            console.log(error);
            
            res.status(400).json({ status: 'failure', error: error.errors })
        }
    }
}