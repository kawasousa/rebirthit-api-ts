import prisma from "../../prisma/client";
import { Post } from '@prisma/client'

export default class PostService {
    public async findAllPosts() {
        const posts = await prisma.post.findMany();
        return posts;
    }

    public async createPost(isAdvanced: boolean, content: string, profileId: string): Promise<Post>{
        return prisma.post.create({
            data: {
                isAdvanced,
                content,
                profileId
            }
        })
    }
}