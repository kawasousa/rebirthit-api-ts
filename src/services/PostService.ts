import prisma from "../../prisma/client";
import { PostDTO } from "../models/PostDTO";
import ProfileService from "./ProfileService";
import { Role } from "./AuthService";
import { AdvancedPostDTO } from "../models/AdvancedPost";
import { InteractionDTO } from "../models/InteractionDTO";

export default class PostService {
    public async createPost(content: string, username: string): Promise<PostDTO> {
        const profile = await prisma.profile.findUnique({ where: { username: username } });

        if (!profile) throw new Error("Profile not found")

        if (profile.isActivated === false) throw new Error('Profile should be activated to create a post')

        const post = await prisma.post.create({
            data: {
                content,
                profile: {
                    connect: { id: profile.id }
                }
            }
        })

        const postDTO: PostDTO = new PostDTO(post.id, post.content, post.createdAt, profile.username, profile.name, profile.icon, profile.role);
        return postDTO;
    }

    public async createAdvancedPost(content: string, username: string): Promise<AdvancedPostDTO> {
        const profile = await prisma.profile.findUnique({ where: { username: username } });

        if (!profile) throw new Error("Profile not found")

        if (profile.isActivated === false) throw new Error('Profile should be activated to create a post')

        const post = await prisma.advancedPost.create({
            data: {
                content,
                profile: {
                    connect: { id: profile.id }
                }
            }
        })

        const advancedPostDTO: AdvancedPostDTO = new AdvancedPostDTO(post.id, post.content, post.createdAt, profile.username, profile.name, profile.icon, profile.role, []);
        return advancedPostDTO;
    }

    public async findAllPosts() {
        const profileService: ProfileService = new ProfileService();

        const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
        const postDTOs: PostDTO[] = [];

        for (const post of posts) {
            const profile = await profileService.findProfileById(post.profileId);

            if (profile) {
                const postDTO: PostDTO = new PostDTO(post.id, post.content, post.createdAt, profile.username, profile.name, profile.icon, profile.role);
                postDTOs.push(postDTO);
            }
        }

        const advancedPosts = await prisma.advancedPost.findMany({ orderBy: { createdAt: 'desc' } });
        const advancedPostDTOs: AdvancedPostDTO[] = [];

        for (const advancedPost of advancedPosts) {
            const profile = await profileService.findProfileById(advancedPost.profileId);

            if(profile){
                const interactions = await prisma.interaction.findMany({where: {advancedPostId: advancedPost.id}});
                const interactionDTOs: InteractionDTO[] = [];

                for(const interaction of interactions){
                    const interactionDTO: InteractionDTO = new InteractionDTO(interaction.authorId, advancedPost.id, interaction.type);
                    interactionDTOs.push(interactionDTO);
                }

                const advancedPostDTO: AdvancedPostDTO = new AdvancedPostDTO(advancedPost.id, advancedPost.content, advancedPost.createdAt,
                    profile.username, profile.name, profile.icon, profile.role, interactionDTOs);

                advancedPostDTOs.push(advancedPostDTO);
            }
        }

        const mergedPosts: PostDTO[] = [...postDTOs, ...advancedPostDTOs].sort((a,b)=> a.createdAt.getTime() - b.createdAt.getTime());

        return mergedPosts;
    }

    public async updatePost(id: string, content: string) {
        return prisma.post.update(
            {
                where: {
                    id: id
                },
                data: {
                    content: content
                }
            }
        )
    }

    public async deletePost(id: string, requestingUsername: string): Promise<void> {
        const profile = await prisma.profile.findUnique({ where: { username: requestingUsername } });
        if (!profile) throw new Error('Profile not found');

        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) throw new Error('Post not found');

        if (profile.role === Role.Admin || post.profileId === profile.id) {
            await prisma.post.delete({ where: { id } });
        }
    }
}