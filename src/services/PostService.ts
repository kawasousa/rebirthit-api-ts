import prisma from "../../prisma/client";

export default class PostService {
    public async findAllPosts() {
        const posts = await prisma.post.findMany();
        return posts;
    }
}