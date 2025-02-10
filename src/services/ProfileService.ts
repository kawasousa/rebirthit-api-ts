import prisma from '../config/prisma';
import { NotFoundError } from '../errors';
import { Profile } from '../models/Profile';

export default class ProfileService {
    public async getAll(): Promise<Profile[]> {
        const profiles = await prisma.profile.findMany();
        const profileDTOs: Profile[] = [];

        for (const profile of profiles) {
            const postsCount = await prisma.post.count({ where: { profileId: profile.id } });

            const profileDTO: Profile = new Profile(profile.username, profile.email, profile.name, profile.icon, profile.role, postsCount);
            profileDTOs.push(profileDTO);
        }

        return profileDTOs;
    }

    public async getById(id: string): Promise<Profile | null> {
        const profile = await prisma.profile.findUnique({
            where: { id }
        })

        if(!profile) throw new NotFoundError('profile not found')

        const postsCount = await prisma.post.count({ where: { profileId: profile.id } });
        const advancedPostCount = await prisma.advancedPost.count({ where: { profileId: profile.id } });
        const totalPostsCount = advancedPostCount + postsCount;

        const profileDIO: Profile = new Profile(profile.username, profile.email, profile.name, profile.icon, profile.role, totalPostsCount);
        return profileDIO;
    }

    public async delete(username: string) {
        const profile = await prisma.profile.findUnique({where: {username}});

        if(!profile) throw new NotFoundError('profile not found');

        await prisma.profile.delete({
            where: { id: profile.id }
        })
    }
}