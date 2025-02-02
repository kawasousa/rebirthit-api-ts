import prisma from "../../prisma/client";
import bcrypt from 'bcrypt';
import jwt from '../utils/token'
import { ProfileDTO } from "../models/ProfileDTO";

export enum Role {
    Default = "Default",
    Admin = "Admin"
}

export default class AuthService {
    public async login(username: string, password: string) {
        const profile = await prisma.profile.findUnique({
            where: { username }
        })

        if (!profile) throw new Error("Profile not found");

        const passwordMatch: boolean = await bcrypt.compare(password, profile.password);
        if (!passwordMatch) throw new Error("Password does not match");

        const postsCount = await prisma.post.count({ where: { profileId: profile.id } })
        const profileDTO: ProfileDTO = new ProfileDTO(profile.username, profile.name, profile.icon, profile.role, postsCount);
        const token = jwt.createToken(profile.id);

        return { profileDTO, token };
    }

    public async register(username: string, password: string, name: string, icon: string, role: Role) {
        const existingProfile = await prisma.profile.findFirst({
            where: {
                username
            }
        })

        if (existingProfile) throw new Error("This profile already exists");

        const hashPassword = await bcrypt.hash(password, 10);
        const profile = await prisma.profile.create({
            data: {
                username,
                password: hashPassword,
                name,
                icon,
                role
            }
        })

        const postsCount = await prisma.post.count({ where: { profileId: profile.id } })
        const profileDTO: ProfileDTO = new ProfileDTO(profile.username, profile.name, profile.icon, profile.role, postsCount);
        const token = jwt.createToken(profile.id);

        return { profileDTO, token };
    }

    public async getProfileById(id: string): Promise<ProfileDTO | null> {
        const profile = await prisma.profile.findUnique({ where: { id } });

        if (profile) {
            const postsCount = await prisma.post.count({ where: { profileId: profile.id } })
            const profileDTO: ProfileDTO = new ProfileDTO(profile.username, profile.name, profile.icon, profile.role, postsCount);
            return profileDTO;
        }

        return null;
    }
}