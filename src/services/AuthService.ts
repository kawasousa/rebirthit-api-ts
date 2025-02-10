import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from '../config/jwt'
import { Profile } from '../models/Profile';
import { Role } from '@prisma/client';
import { BadRequestError, ConflitError, NotFoundError } from '../errors';

export default class AuthService {
    public async login(uniqueCredential: string, password: string) {
        const profile = await prisma.profile.findFirst({
            where: {
                OR: [{
                    username: uniqueCredential,
                },
                {
                    email: uniqueCredential
                }]
            }
        })

        if (!profile) throw new NotFoundError('profile not found');

        const passwordMatch: boolean = await bcrypt.compare(password, profile.password);
        if (!passwordMatch) throw new BadRequestError('password does not match');

        const postsCount = await prisma.post.count({ where: { profileId: profile.id } })
        const profileDTO: Profile = new Profile(profile.username, profile.email, profile.name, profile.icon, profile.role, postsCount);
        const token = jwt.generate(profile.id);

        return { profileDTO, token };
    }

    public async register(username: string, email: string, password: string, name: string, icon: string, role: Role) {
        const existingProfile = await prisma.profile.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        })

        if (existingProfile) throw new ConflitError('this profile already exists');

        const hashPassword = await bcrypt.hash(password, 10);
        const profile = await prisma.profile.create({
            data: {
                username,
                email,
                password: hashPassword,
                name,
                icon,
                role
            }
        })

        const postsCount = await prisma.post.count({ where: { profileId: profile.id } });

        const profileDTO: Profile = new Profile(profile.username, profile.email, profile.name, profile.icon, profile.role, postsCount);
        const token = jwt.generate(profile.id);

        return { profileDTO, token };
    }

    public async getProfileById(id: string): Promise<Profile | null> {
        const profile = await prisma.profile.findUnique({ where: { id } });

        if (!profile) throw new NotFoundError('profile not found');

        const postsCount = await prisma.post.count({ where: { profileId: profile.id } });
        const advancedPostCount = await prisma.advancedPost.count({ where: { profileId: profile.id } });
        const totalPostCount = postsCount + advancedPostCount;
        const profileDTO: Profile = new Profile(profile.username, profile.email, profile.name, profile.icon, profile.role, totalPostCount);
        return profileDTO;
    }
}