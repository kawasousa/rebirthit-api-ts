import prisma from "../../prisma/client";
import { Profile } from '@prisma/client'

export default class ProfileService {
    public async findAllProfiles() {
        return prisma.profile.findMany();
    }

    public async createProfile(nickname: string, email: string, photo_url: string,
        password: string, isActivated: boolean, isAdvanced: boolean): Promise<Profile> {

        return prisma.profile.create({
            data: {
                nickname: nickname,
                email: email,
                photo_url: photo_url,
                password: password,
                isActivated: isActivated,
                isAdvanced: isAdvanced
            }
        })
    }
}