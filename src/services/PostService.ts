import prisma from "../../prisma/client";
import { Post } from '@prisma/client'

export default class PostService {
    public async createPost(content: string, profileId: string): Promise<Post> {
        return prisma.post.create({
            data: {
                content,
                profile: {
                    connect: {id: profileId}
                }
            }
        })
    }

    public async findAllPosts() {
        const posts = await prisma.post.findMany();
        return posts;
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

    public async deletePost(id: string): Promise<Post> {
        return prisma.post.delete(
            {
                where: {
                    id: id
                }
            }
        )
    }
}