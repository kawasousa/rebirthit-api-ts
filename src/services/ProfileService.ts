import prisma from "../../prisma/client";
import { ProfileDTO } from "../models/ProfileDTO";

export default class ProfileService {
    public async findAllProfiles(): Promise<ProfileDTO[]> {
        const profiles = await prisma.profile.findMany();
        const profileDTOs: ProfileDTO[] = [];
        
        for(const profile of profiles){
            const postsCount = await prisma.post.count({where: {profileId: profile.id}});
            console.log(postsCount)

            const profileDTO = new ProfileDTO(profile.username, profile.name, profile.icon, profile.role, postsCount);
            profileDTOs.push(profileDTO);
        }

        return profileDTOs;
    }

    public async findProfileById(id: string): Promise<ProfileDTO | null> {
        const profile = await prisma.profile.findUnique({
            where: { id }
        })

        if(profile){
            const postsCount = await prisma.post.count({where: {profileId: profile.id}});

            const profileDIO: ProfileDTO = new ProfileDTO(profile.username, profile.name, profile.icon, profile.role, postsCount);
            return profileDIO;
        }

        return null;
    }
    
    public async deleteProfile(id: string) {
        return prisma.profile.delete({
            where: { id: id }
        })
    }
}