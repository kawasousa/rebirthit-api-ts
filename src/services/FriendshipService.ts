import { FriendshipStatus } from '@prisma/client';
import prisma from '../config/prisma';
import { Friendship } from "../models/Friendship";
import { BadRequestError, ConflitError, NotFoundError } from '../errors';

export default class FriendshipService {
    public async create(senderUsername: string, receiverUsername: string): Promise<Friendship> {
        const sender = await prisma.profile.findUnique({ where: { username: senderUsername } });
        const receiver = await prisma.profile.findUnique({ where: { username: receiverUsername } });

        if (!sender || !receiver) throw new NotFoundError('profile not found');

        const existentFriendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { senderId: sender.id, receiverId: receiver.id },
                    { senderId: receiver.id, receiverId: sender.id }
                ]
            }
        })

        if (existentFriendship) throw new ConflitError('this friendship already exists');

        const friendship = await prisma.friendship.create({
            data: {
                sender: {
                    connect: { id: sender.id }
                },
                receiver: {
                    connect: { id: receiver.id }
                }
            }
        })

        const friendshipDTO: Friendship = new Friendship(sender.username, receiver.username, friendship.status, friendship.createAt);
        return friendshipDTO;
    }

    public async getAllByUsername(username: string): Promise<Friendship[]> {
        const profile = await prisma.profile.findUnique({ where: { username } });

        if (!profile) throw new NotFoundError('profile not found');

        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                    { senderId: profile.id },
                    { receiverId: profile.id }
                ]
            }
        })

        const friendshipDTOs: Friendship[] = [];

        for (const friendship of friendships) {
            const sender = await prisma.profile.findUnique({ where: { id: friendship.senderId } })
            const receiver = await prisma.profile.findUnique({ where: { id: friendship.receiverId } })

            if (!sender || !receiver) throw new NotFoundError('profile not found')

            const friendshipDTO: Friendship = new Friendship(sender.username, receiver.username, friendship.status, friendship.createAt);
            friendshipDTOs.push(friendshipDTO);
        }

        return friendshipDTOs;
    }

    public async update(senderUsername: string, receiverUsername: string, status: string): Promise<Friendship> {
        const sender = await prisma.profile.findUnique({ where: { username: senderUsername } });
        const receiver = await prisma.profile.findUnique({ where: { username: receiverUsername } });

        
        if (!sender || !receiver) throw new NotFoundError('profile not found');
        
        const existentFriendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { senderId: sender.id, receiverId: receiver.id },
                    { senderId: receiver.id, receiverId: sender.id }
                ]
            }
        })
        
        if (!existentFriendship) throw new NotFoundError('friendship not found');
 
        if (!Object.values(FriendshipStatus).includes(status as FriendshipStatus)) throw new BadRequestError('invalid friendship status');
        const statusType: FriendshipStatus = status as FriendshipStatus;
        
        const friendship = await prisma.friendship.update({
            where: {
                senderId_receiverId: {
                    senderId: existentFriendship.senderId,
                    receiverId: existentFriendship.receiverId
                }
            },
            data: {
                status: statusType
            }

        })

        const friendshipDTO: Friendship = new Friendship(sender.username, receiver.username, friendship.status, friendship.createAt);
        return friendshipDTO;
    }

    public async delete(senderUsername: string, receiverUsername: string) {
        const sender = await prisma.profile.findUnique({ where: { username: senderUsername } });
        const receiver = await prisma.profile.findUnique({ where: { username: receiverUsername } });

        if (!sender || !receiver) throw new NotFoundError('profile not found');

        const friendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { senderId: sender.id, receiverId: receiver.id },
                    { senderId: receiver.id, receiverId: sender.id }
                ]
            }
        })

        if (!friendship) throw new NotFoundError('friendship not found');

        const deleted = await prisma.friendship.delete({
            where: {
                senderId_receiverId: {
                    senderId: friendship.senderId,
                    receiverId: friendship.receiverId
                }
            }
        })

        return deleted || null;
    }
}