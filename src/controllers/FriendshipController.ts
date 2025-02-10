import { BadRequestError, InternalServerError } from '../errors';
import FriendshipService from '../services/FriendshipService';
import { NextFunction, Request, Response } from 'express';

export default class FriendshipController {
    private friendshipService: FriendshipService;
    constructor() {
        this.friendshipService = new FriendshipService();
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const { senderUsername, receiverUsername } = req.body;

        try {
            if (!senderUsername) throw new BadRequestError('senderUsername not provided');
            if (!receiverUsername) throw new BadRequestError('receiverUsername not provided');
            if(senderUsername === receiverUsername) throw new BadRequestError('profile usernames must be diferent');

            const friendship = await this.friendshipService.create(senderUsername, receiverUsername);

            if (!friendship) throw new InternalServerError('error while creating friendship');

            res.status(201).json({ friendship, message: 'friendship created' });
        } catch (error) {
            next(error);
        }
    }

    public async getAllByUsername(req: Request, res: Response, next: NextFunction) {
        const { username } = req.params;
        try {
            const friendships = await this.friendshipService.getAllByUsername(username);
            res.status(200).json(friendships);
        } catch (error: any) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const { senderUsername, receiverUsername, status } = req.body;

        try {
            if (!senderUsername) throw new BadRequestError('senderUsername not provided');
            if (!receiverUsername) throw new BadRequestError('receiverUsername not provided');
            if (!status) throw new BadRequestError('status not provided');

            const friendship = await this.friendshipService.update(senderUsername, receiverUsername, status);
            if (!friendship) throw new InternalServerError('friendship not updated')

            res.status(204).end();
        } catch (error: any) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const { senderUsername, receiverUsername } = req.body;

        try {
            if (!senderUsername) throw new BadRequestError('senderUsername not provided');
            if (!receiverUsername) throw new BadRequestError('receiverUsername not provided');

            const friendship = await this.friendshipService.delete(senderUsername, receiverUsername);

            if (!friendship) throw new InternalServerError('friendship not deleted');

            res.status(204).end();
        } catch (error: any) {
            next(error);
        }
    }
}