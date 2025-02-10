import prisma from '../config/prisma';
import { Post } from "../models/Post";
import ProfileService from "./ProfileService";
import { Role } from '@prisma/client';
import { AdvancedPost } from "../models/AdvancedPost";
import { Interaction } from "../models/Interaction";
import { NotFoundError, UnauthorizedError } from '../errors';

export default class PostService {
    public async create(content: string, username: string, title?: string): Promise<Post> {
        const profile = await prisma.profile.findUnique({ where: { username } });

        if (!profile) throw new NotFoundError("profile not found")

        if (profile.isActivated === false) throw new UnauthorizedError('profile should be activated to create a post');

        const post = await prisma.post.create({
            data: {
                content,
                profile: {
                    connect: { id: profile.id }
                },
                ...(title && { title })
            }
        })

        const postDTO: Post = new Post(post.id, post.content, post.createdAt, profile.username, profile.name, profile.icon, profile.role, title || undefined);
        return postDTO;
    }

    public async createAdvanced(content: string, username: string, title?: string): Promise<AdvancedPost> {
        const profile = await prisma.profile.findUnique({ where: { username } });

        if (!profile) throw new NotFoundError("Profile not found")

        if (profile.isActivated === false) throw new UnauthorizedError('Profile should be activated to create a post')

        const post = await prisma.advancedPost.create({
            data: {
                content,
                profile: {
                    connect: { id: profile.id }
                },
                ...(title && { title })
            }
        })

        const advancedPostDTO: AdvancedPost = new AdvancedPost(post.id, post.content, post.createdAt, profile.username, profile.name, profile.icon, profile.role, [], title || undefined);
        return advancedPostDTO;
    }

    public async getAll(): Promise<Post[]> {
        const profileService: ProfileService = new ProfileService();
        const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
        const postDTOs: Post[] = [];

        for (const post of posts) {
            const profile = await profileService.getById(post.profileId);

            if (profile) {
                const postDTO: Post = new Post(post.id, post.content, post.createdAt, profile.username, profile.name, profile.icon, profile.role, post.title || undefined);
                postDTOs.push(postDTO);
            }
        }

        const advancedPosts = await prisma.advancedPost.findMany({ orderBy: { createdAt: 'desc' } });
        const advancedPostDTOs: AdvancedPost[] = [];

        for (const advancedPost of advancedPosts) {
            const profile = await profileService.getById(advancedPost.profileId);

            if (profile) {
                const interactions = await prisma.interaction.findMany({ where: { advancedPostId: advancedPost.id } });
                const interactionDTOs: Interaction[] = [];

                for (const interaction of interactions) {
                    const interactionDTO: Interaction = new Interaction(interaction.profileId, advancedPost.id, interaction.type);
                    interactionDTOs.push(interactionDTO);
                }

                const advancedPostDTO: AdvancedPost = new AdvancedPost(advancedPost.id, advancedPost.content, advancedPost.createdAt,
                    profile.username, profile.name, profile.icon, profile.role, interactionDTOs, advancedPost.title || undefined);

                advancedPostDTOs.push(advancedPostDTO);
            }
        }

        const mergedPosts: Post[] = [...postDTOs, ...advancedPostDTOs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        return mergedPosts;
    }

    public async delete(id: string, username: string): Promise<void> {
        const profile = await prisma.profile.findUnique({ where: { username } });
        if (!profile) throw new NotFoundError('profile not found');

        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) throw new NotFoundError('post not found');

        if (profile.role === Role.Admin || post.profileId === profile.id) {
            await prisma.post.delete({ where: { id: post.id } });
        }
    }

    public async deleteAdvanced(id: string, username: string): Promise<void> {
        const profile = await prisma.profile.findUnique({ where: { username } });
        if (!profile) throw new NotFoundError('profile not found');

        const post = await prisma.advancedPost.findUnique({ where: { id } });
        if (!post) throw new NotFoundError('post not found');

        if (profile.role === Role.Admin || post.profileId === profile.id) {
            await prisma.advancedPost.delete({ where: { id: post.id } });
        }
    }
}